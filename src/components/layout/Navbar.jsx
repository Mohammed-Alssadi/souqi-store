import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useProductStore } from "../../features/products/store";
import { useCartStore } from "../../features/cart/store";
import { useAuthStore } from "../../features/auth/store";
import {
  User,
  ShoppingCart,
  Search,
  Menu,
  X,
  Check,
  Info,
  Armchair,
  Globe,
} from "lucide-react";
import Cart from "../../features/cart/components/Cart";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from '../ui/ThemeToggle';


function Navbar() {
  // ===================== الحالة =====================
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [searchInput, setSearchInput] = useState(location.state?.q || "");
  
  // مزامنة مربع البحث مع حالة المتصفح (State) بدلاً من الرابط
  useEffect(() => {
    setSearchInput(location.state?.q || "");
  }, [location.state?.q]);

  const [cartOpen, setCartOpen] = useState(false);

  // ===================== الإعدادات العامة =====================
  const navigate = useNavigate();
  const setSearchTerm = useProductStore((state) => state.setSearchTerm);
  const cartItems = useCartStore((state) => state.items);
  const { user, signOut } = useAuthStore();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const { t, i18n } = useTranslation();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // ===================== تأثير التمرير =====================
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===================== البحث =====================
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") return;
    // تحديث احترافي: إخفاء البحث من الرابط وتمريره كـ State للحفاظ على الخصوصية والمظهر النظيف
    navigate(`/search`, { state: { q: searchInput.trim() } });
    setIsSearchOpen(false);
  };

  // ===================== JSX =====================
  return (
    <>

      <header
        className={`sticky top-0 start-0 end-0 z-50 w-full transition-colors duration-500 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 border-b border-border shadow-sm`}
      >
        {/* الشريط العلوي */}
        {/* <div className={`bg-primary px-4 py-2 ${isScrolled ? "hidden" : ""}`}>
          <div className="flex justify-between items-center gap-2 text-primary-foreground text-sm">
            <p className="flex items-center gap-2">
              <Check size={16} /> Free on all orders over $50
            </p>

            <div className="flex items-center gap-4">
              <Link to="/faqs" className="hidden sm:block hover:underline">
                {t('navbar.faqs', 'FAQs')}
              </Link>

              <Link
                to="/help"
                className="hidden sm:flex items-center gap-1 hover:underline"
              >
                <Info size={16} /> {t('navbar.needHelp', 'Need help')}
              </Link>
            </div>
          </div>
        </div> */}

        {/* الهيدر الرئيسي */}
        <div className={`transition-all duration-300 ${isScrolled ? "py-3 md:py-3" : "py-3 md:py-5"}`}>
          <div className="w-full px-4 md:container md:mx-auto flex items-center justify-between">
            {/* الشعار */}
            <Link
              to="/"
              className="flex items-center group"
            >
              {i18n.language.startsWith('ar') ? (
                <div className="flex items-center font-logo-rest-ar font-black" dir="rtl">
                  {/* استخدام نفس الخط للكلمة العربية لضمان اتصال الحروف بشكل مثالي بدون تداخل */}
                  <span className="text-primary text-3xl md:text-4xl leading-none">س&zwj;</span>
                  <span className="text-foreground text-3xl md:text-4xl leading-none tracking-tight">&zwj;وقي</span>
                  <span className="text-primary text-3xl md:text-4xl leading-none ms-1 group-hover:animate-bounce inline-block">.</span>
                </div>
              ) : (
                <div className="flex items-baseline transform -translate-y-1.5 md:-translate-y-3" dir="ltr">
                  <span className="text-primary text-4xl md:text-5xl font-logo-first-en italic font-black leading-none transform group-hover:scale-105 transition-transform inline-block">S</span>
                  <span className="text-foreground text-xl md:text-2xl font-logo-rest-en font-extrabold leading-none uppercase tracking-[0.15em] ms-0.5">ouqi</span>
                  <span className="text-primary text-4xl md:text-5xl leading-none font-black ms-0.5 group-hover:animate-bounce inline-block">.</span>
                </div>
              )}
            </Link>



            {/* نافذة البحث للجوال */}
            {isSearchOpen && (
              <div className="absolute top-full start-0 end-0 bg-background p-4 shadow-lg lg:hidden z-50">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t('navbar.searchPlaceholder', 'Search...')}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="flex-1 border border-border rounded-full px-5 py-2 focus:outline-none bg-accent/40 dark:bg-white/5 focus:bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground px-4 rounded hover:bg-primary/90"
                  >
                    {t('navbar.go', 'Go')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 text-muted-foreground"
                  >
                    <X size={20} />
                  </button>
                </form>
              </div>
            )}

            {/* روابط التصفح - للشاشات الكبيرة */}
            <nav className="hidden lg:flex gap-6">
              <Link to="/" className="text-foreground font-medium hover:text-primary">
                {t('navbar.home')}
              </Link>
               <Link to="/categories" className="text-foreground font-medium hover:text-primary">
                {t('navbar.categories')}
              </Link>
              <Link to="/products" className="text-foreground font-medium hover:text-primary">
                {t('navbar.products')}
              </Link>
            </nav>

            {/* مربع البحث الكبير */}
            <div className="hidden lg:block flex-1 max-w-md mx-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder={t('navbar.searchHere', 'Search here...')}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full h-11 bg-gray-100 dark:bg-secondary/30 border border-gray-200 dark:border-transparent hover:bg-gray-200 dark:hover:bg-secondary/50 focus:bg-white dark:focus:bg-background focus:border-primary rounded-full ps-5 pe-12 focus:outline-none focus:ring-4 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute end-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>

            {/* الأيقونات */}
            <div
              className="flex items-center gap-4 sm:gap-5 md:gap-6 ms-1 md:ms-2"
              onMouseLeave={() =>
                setTimeout(() => setIsUserMenuOpen(false), 5000)
              }
            >
              {/* أيقونة البحث للجوال */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden text-foreground hover:text-primary transition-colors p-1"
              >
                <Search size={24} />
              </button>

              {/* أيقونة السلة */}
              <div className="relative p-1">
                <ShoppingCart
                  onClick={() => setCartOpen(true)}
                  size={26}
                  className="text-foreground hover:text-primary cursor-pointer transition-colors"
                />
                <Cart visible={cartOpen} setvisible={setCartOpen} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -end-1.5 bg-primary text-primary-foreground text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm">
                    {itemCount}
                  </span>
                )}
              </div>

              <div className="hidden lg:block">
                <ThemeToggle />
              </div>

              {/* Language Switch */}
              <button
                onClick={() => changeLanguage(i18n.language.startsWith('ar') ? 'en' : 'ar')}
                className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors font-bold text-sm"
              >
                <Globe size={18} />
                {i18n.language.startsWith('ar') ? 'EN' : 'AR'}
              </button>

              {/* أزرار تسجيل الدخول / الخروج */}
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="hidden md:flex items-center gap-2 px-4 py-1.5 text-sm font-bold text-destructive bg-destructive/10 border border-destructive/20 rounded-full hover:bg-destructive hover:text-white transition-all"
                >
                  {t('navbar.signOut', 'Sign Out')}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-2 px-5 py-1.5 text-sm font-bold text-white bg-primary rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                >
                  <User size={18} />
                  {t('navbar.login')}
                </Link>
              )}

              {/* قائمة الجوال */}
              <button
                className="lg:hidden text-foreground hover:text-primary transition-colors p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* القائمة المنسدلة للجوال */}
          {isMobileMenuOpen && (
            <>
              {/* خلفية معتمة (Overlay) */}
              <div 
                className="fixed inset-0 top-[76px] bg-black/40 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              ></div>
              
              {/* حاوية القائمة */}
              <div className="absolute top-full start-0 end-0 lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-t border-b border-border z-50">
                <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                {/* إعدادات المظهر واللغة للموبايل */}
                <div className="grid grid-cols-2 gap-3 pb-4 mb-2 border-b border-border mt-2">
                  
                  {/* بطاقة المظهر */}
                  <div className="flex items-center justify-between bg-secondary/30 dark:bg-secondary/10 border border-border/40 rounded-2xl p-1.5 ps-4 shadow-sm">
                    <span className="text-sm font-bold text-foreground">{i18n.language.startsWith('ar') ? 'المظهر' : 'Theme'}</span>
                    <ThemeToggle />
                  </div>

                  {/* بطاقة اللغة */}
                  <button
                    onClick={() => { changeLanguage(i18n.language.startsWith('ar') ? 'en' : 'ar'); setIsMobileMenuOpen(false); }}
                    className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-2xl p-1.5 ps-4 shadow-sm hover:bg-primary/20 transition-all group"
                  >
                    <span className="text-sm font-bold text-primary">{i18n.language.startsWith('ar') ? 'English' : 'عربي'}</span>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm border border-primary/10">
                      <Globe size={18} className="text-primary group-hover:rotate-12 transition-transform" />
                    </div>
                  </button>

                </div>

                {[
                  { name: t('navbar.home'), path: "" },
                  { name: t('navbar.categories'), path: "categories" },
                  { name: t('navbar.products'), path: "products" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={`/${item.path}`}
                    className="py-2 text-foreground font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* روابط تسجيل الدخول للموبايل */}
                <hr className="border-border my-1" />
                {user ? (
                  <button
                    onClick={() => { handleSignOut(); setIsMobileMenuOpen(false); }}
                    className="py-2 text-destructive font-medium text-start flex items-center gap-2"
                  >
                    {t('navbar.signOut', 'Sign Out')}
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="py-2 text-primary font-medium flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={18} />
                    {t('navbar.login')}
                  </Link>
                )}
              </div>
            </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
