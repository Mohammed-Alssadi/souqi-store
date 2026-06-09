import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";

import { useCartStore } from "../../../features/cart/store";
import { useAuthStore } from "../../../features/auth/store";
import Cart from "../../../features/cart/components/Cart";
import { ThemeToggle } from "../../ui/ThemeToggle";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import MobileSearchOverlay from "./MobileSearchOverlay";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const { user } = useAuthStore();
  const { i18n } = useTranslation();

  // ===================== تأثير التمرير =====================
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 start-0 end-0 z-50 w-full transition-colors duration-500 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 border-b border-border shadow-sm`}
    >
      <div className={`transition-all duration-300 ${isScrolled ? "py-3 md:py-3" : "py-3 md:py-5"}`}>
        <div className="w-full px-4 md:container md:mx-auto flex items-center justify-between">
          
          {/* الشعار */}
          <Logo />

          {/* روابط التصفح - للشاشات الكبيرة */}
          <NavLinks />

          {/* مربع البحث الكبير */}
          <SearchBar />

          {/* الأيقونات اليمين */}
          <div className="flex items-center gap-4 sm:gap-5 md:gap-6 ms-1 md:ms-2">
            
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

            {/* مغير المظهر للديسكتوب */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            {/* مغير اللغة للديسكتوب */}
            <button
              onClick={() => i18n.changeLanguage(i18n.language.startsWith('ar') ? 'en' : 'ar')}
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors font-bold text-sm"
            >
              <GlobeIcon />
              {i18n.language.startsWith('ar') ? 'EN' : 'AR'}
            </button>

            {/* قائمة المستخدم والأفاتار */}
            {user && <UserMenu />}
            {!user && (
              <div className="hidden md:block">
                <UserMenu /> 
                {/* UserMenu handles the 'login' button state natively if not logged in */}
              </div>
            )}

            {/* قائمة الجوال باستخدام Shadcn Sheet */}
            <MobileMenu onOpenSearch={() => setIsMobileSearchOpen(true)} />
          </div>
        </div>

        <MobileSearchOverlay isOpen={isMobileSearchOpen} setIsOpen={setIsMobileSearchOpen} />
      </div>
    </header>
  );
}

function GlobeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}
