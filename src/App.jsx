import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PrimeReactProvider } from "primereact/api";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollManager from "./components/layout/ScrollManager";
import { ThemeProvider } from "./components/ThemeProvider";

// الصفحات العامة
import Home from "./features/home/pages/Home";
import AllProducts from "./features/products/pages/AllProducts";
import ProductDetails from "./features/products/pages/ProductDetails";
import ProductByCategory from "./features/products/pages/ProductByCategory";
import SearchResultsPage from "./features/search/pages/SearchResultsPage";
import AllCategories from "./features/categories/pages/AllCategories";
import CartPage from "./features/cart/pages/CartPage";
import NotFound from "./pages/NotFound";
import LoginForm from "./features/auth/pages/LoginForm";
import RegisterForm from "./features/auth/pages/RegisterForm";

import "./index.css";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // تحديد الاتجاه بناءً على اللغة (rtl للعربية، و ltr للغات الأخرى)
    const dir = i18n.dir(i18n.language);
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
    
    // تحديث عنوان الموقع ديناميكياً
    document.title = i18n.language.startsWith('ar') ? 'سوقي | أحدث المنتجات' : 'Souqi | Latest Products';
  }, [i18n, i18n.language]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="ecommerce-theme">
      <PrimeReactProvider value={{ rtl: i18n.language.startsWith('ar') }}>
        <BrowserRouter>
          <ScrollManager />
        <Navbar />

        <main className="container mx-auto min-h-[70vh] px-1 md:px-4">
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
            <Route path="/register" element={<RegisterForm />} />            {/* صفحة غير موجودة */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        </BrowserRouter>
      </PrimeReactProvider>
    </ThemeProvider>
  );
}

export default App;
