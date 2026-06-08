import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [searchInput, setSearchInput] = useState("");
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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===================== البحث =====================
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") return;
    setSearchTerm(searchInput.trim());
    navigate("/search");
    setIsSearchOpen(false);
    setSearchInput("");
  };

  // ===================== JSX =====================
  return (
    <>
      {/* مساحة لتعويض الهيدر الثابت */}
      <div className="h-32"></div>

      <header
        className={`fixed top-0 start-0 end-0 z-50 w-full transition-all duration-500 bg-background`}
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
        <div className="py-5  bg-white dark:bg-gray-800">
          <div className="container mx-3 md:mx-auto px-1 flex items-center justify-between">
            {/* الشعار */}
            <Link
              to="/"
              className="text-3xl md:text-4xl font-black tracking-tighter flex items-center"
            >
              {i18n.language.startsWith('ar') ? (
                <div className="flex items-baseline font-brand tracking-normal">
                  <span className="bg-gradient-to-br from-primary to-pink-500 bg-clip-text text-transparent text-4xl md:text-5xl drop-shadow-sm pe-1 font-normal leading-none pb-2 pt-1">زيكو</span>
                  <span className="text-primary text-3xl md:text-4xl leading-none">.</span>
                </div>
              ) : (
                <div className="flex items-baseline font-brand tracking-normal">
                  <span className="bg-gradient-to-br from-primary to-pink-500 bg-clip-text text-transparent text-4xl md:text-5xl drop-shadow-sm font-normal leading-none pb-2 pt-1">Z</span>
                  <span className="text-foreground font-normal leading-none">eco</span>
                  <span className="text-primary text-4xl leading-none">.</span>
                </div>
              )}
            </Link>

            {/* بحث الجوال */}
            <div className="lg:hidden ms-auto me-2 pt-2 flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => changeLanguage(i18n.language.startsWith('ar') ? 'en' : 'ar')}
                className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors text-sm font-bold"
              >
                <Globe size={18} />
                {i18n.language.startsWith('ar') ? 'EN' : 'عربي'}
              </button>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="px-2 text-foreground hover:bg-accent rounded-full"
              >
                <Search size={26} />
              </button>
            </div>

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
              className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 ms-2"
              onMouseLeave={() =>
                setTimeout(() => setIsUserMenuOpen(false), 5000)
              }
            >
              {/* أيقونة السلة */}
              <div className="relative">
                <ShoppingCart
                  onClick={() => setCartOpen(true)}
                  size={28}
                  className="text-foreground hover:text-primary cursor-pointer"
                />
                <Cart visible={cartOpen} setvisible={setCartOpen} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -end-3 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>

              <ThemeToggle />

              {/* Language Switch */}
              <button
                onClick={() => changeLanguage(i18n.language.startsWith('ar') ? 'en' : 'ar')}
                className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors font-bold text-sm"
              >
                <Globe size={18} />
                {i18n.language.startsWith('ar') ? 'EN' : 'عربي'}
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
                className="lg:hidden text-foreground hover:bg-accent rounded-full ms-3"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* القائمة المنسدلة للجوال */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-card border-t border-border">
              <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
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
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
