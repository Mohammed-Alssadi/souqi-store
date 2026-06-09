import React, { useState, useEffect } from "react";
import { ShoppingCart, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useCartStore } from "../../../features/cart/store";
import { useAuthStore } from "../../../features/auth/store";
import Cart from "../../../features/cart/components/Cart";
import { ThemeToggle } from "../../common/ThemeToggle";
import { LangSwitch } from "../../common/LangSwitch";

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
          <div className="flex items-center gap-1.5 sm:gap-5 md:gap-6 ms-1 md:ms-2">
            
            {/* أيقونة البحث للموبايل */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSearchOpen(true)}
              className="md:hidden rounded-full hover:bg-transparent px-0 mx-0 hover:text-primary w-10 h-10"
            >
              <Search size={26} />
            </Button>

            {/* أيقونة السلة */}
            <div className="relative flex items-center">
              <Button variant="ghost" size="icon" onClick={() => setCartOpen(true)} className="rounded-full hover:bg-transparent hover:text-primary w-10 h-10">
                <ShoppingCart size={26} />
              </Button>
              <Cart visible={cartOpen} setvisible={setCartOpen} />
              {itemCount > 0 && (
                <Badge className="absolute top-0 end-0 -translate-y-1/4 translate-x-1/4 rtl:-translate-x-1/4 px-1.5 min-w-[20px] h-[20px] flex items-center justify-center border-2 border-background shadow-sm text-[10px] rounded-full pointer-events-none">
                  {itemCount}
                </Badge>
              )}
            </div>

            {/* مغير المظهر للديسكتوب */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            {/* مغير اللغة للديسكتوب */}
            <LangSwitch className="hidden lg:flex" />

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

