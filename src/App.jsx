import React, { useEffect, Suspense, lazy, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/Footer";
import ScrollManager from "./components/layout/ScrollManager";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/sonner";

import PageLoader from "./components/common/PageLoader";
import FullScreenSplash from "./components/common/FullScreenSplash";

// تحميل الصفحات ديناميكياً (Lazy Loading) لتحسين الأداء
const Home = lazy(() => import("./features/home/pages/Home"));
const AllProducts = lazy(() => import("./features/products/pages/AllProducts"));
const ProductDetails = lazy(() => import("./features/products/pages/ProductDetails"));
const ProductByCategory = lazy(() => import("./features/products/pages/ProductByCategory"));
const SearchResultsPage = lazy(() => import("./features/search/pages/SearchResultsPage"));
const AllCategories = lazy(() => import("./features/categories/pages/AllCategories"));
const CartPage = lazy(() => import("./features/cart/pages/CartPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LoginForm = lazy(() => import("./features/auth/pages/LoginForm"));
const RegisterForm = lazy(() => import("./features/auth/pages/RegisterForm"));
const VerifyEmail = lazy(() => import("./features/auth/pages/VerifyEmail"));

import { supabase } from "./lib/supabase";
import { useAuthStore } from "./features/auth/store";
import { useProductStore } from "./features/products/store";
import { useCategoryStore } from "./features/categories/store";
import "./index.css";

function App() {
  const { i18n } = useTranslation();
  const { setUser, setSession, setLoading } = useAuthStore();
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  useEffect(() => {
    // تحديد الاتجاه بناءً على اللغة (rtl للعربية، و ltr للغات الأخرى)
    const dir = i18n.dir(i18n.language);
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
    
    // تحديث عنوان الموقع ديناميكياً
    // تمت إزالته لكي يتولى مكون SEO (react-helmet-async) إدارة العنوان حسب الصفحة
  }, [i18n, i18n.language]);

  // مزامنة حالة الجلسة مع Supabase بشكل نشط وتلقائي عند فتح الموقع أو تحديث الصفحة
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // الاستماع لأي تغيير يطرأ على الجلسة (تسجيل دخول، خروج، تأكيد إيميل، إلخ)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setSession, setLoading]);

  // ===============================
  // 🚀 منطق شاشة البداية الافتتاحية
  // ===============================
  const isProductLoading = useProductStore((state) => state.isLoading);
  const isCategoryLoading = useCategoryStore((state) => state.isLoading);
  const isAuthLoading = useAuthStore((state) => state.loading);

  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('hasSeenSplash'));
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!showSplash) return;

    // الحل الاحترافي: الشاشة الافتتاحية تهدف فقط لتغطية التهيئة الأولية للمتصفح (DOM & CSS) 
    // ولا يجب أن توقف المستخدم حتى يتم جلب كل البيانات (Progressive Rendering)
    // نترك الشاشة لثانية واحدة كجزء من الهوية البصرية، وبعدها نكشف الموقع حيث ستظهر السكلتونز 
    // ويتم تدفق البيانات تدريجياً.
    const timer1 = setTimeout(() => {
      setIsFadingOut(true);
      
      const timer2 = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
      }, 700); // مدة تلاشي الشاشة
    }, 1300); // مدة عرض الشاشة الافتتاحية (ثانية واحدة)

    return () => clearTimeout(timer1);
  }, [showSplash]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="ecommerce-theme">
      <BrowserRouter>
        {showSplash && <FullScreenSplash isFadingOut={isFadingOut} />}

        <>
          <ScrollManager />
          <Navbar />

          <main className="container mx-auto px-5 w-full min-h-[70vh]">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* المستخدم */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/category/:slug" element={<ProductByCategory />} />
                <Route path="/categories" element={<AllCategories />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                {/* صفحة غير موجودة */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </>

        <Toaster position={i18n?.language?.startsWith('ar') ? 'top-left' : 'top-right'} richColors />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
