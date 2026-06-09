import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Search, Globe, User } from "lucide-react";

import { useAuthStore } from "../../../features/auth/store";
import { ThemeToggle } from "../../ui/ThemeToggle";
import Logo from "./Logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

export default function MobileMenu({ onOpenSearch }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const openSearch = () => {
    setOpen(false);
    onOpenSearch();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden text-foreground hover:text-primary transition-colors p-1">
          <Menu size={26} />
        </button>
      </SheetTrigger>
      
      {/* Side of the drawer dynamically changes based on RTL/LTR in sheet.jsx, default is 'end' (start or end) */}
      <SheetContent side="start" className="w-[85vw] max-w-sm sm:max-w-sm p-0 flex flex-col h-full bg-white dark:bg-gray-900 border-none">
        <SheetHeader className="p-4 border-b border-border flex items-start">
          <SheetTitle asChild>
            <div onClick={() => setOpen(false)} className="w-fit">
              <Logo />
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          
          {/* إعدادات المظهر واللغة والبحث للموبايل */}
          <div className="grid grid-cols-3 gap-2 pb-4 mb-2 border-b border-border">
            {/* بطاقة البحث */}
            <button
              onClick={openSearch}
              className="flex flex-col items-center justify-center gap-1 bg-secondary/20 dark:bg-secondary/10 border border-border/40 rounded-2xl p-2 shadow-sm hover:bg-secondary/40 transition-all"
            >
              <Search size={20} className="text-foreground" />
              <span className="text-xs font-bold text-foreground">{t('navbar.search', 'Search')}</span>
            </button>

            {/* بطاقة المظهر */}
            <div className="flex flex-col items-center justify-center gap-1 bg-secondary/20 dark:bg-secondary/10 border border-border/40 rounded-2xl p-2 shadow-sm">
              <ThemeToggle />
              <span className="text-xs font-bold text-foreground">{i18n.language.startsWith('ar') ? 'المظهر' : 'Theme'}</span>
            </div>

            {/* بطاقة اللغة */}
            <button
              onClick={() => changeLanguage(i18n.language.startsWith('ar') ? 'en' : 'ar')}
              className="flex flex-col items-center justify-center gap-1 bg-primary/10 border border-primary/20 rounded-2xl p-2 shadow-sm hover:bg-primary/20 transition-all group"
            >
              <Globe size={20} className="text-primary group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-bold text-primary">{i18n.language.startsWith('ar') ? 'English' : 'عربي'}</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            {[
              { name: t('navbar.home'), path: "" },
              { name: t('navbar.categories'), path: "categories" },
              { name: t('navbar.products'), path: "products" },
            ].map((item) => (
              <Link
                key={item.name}
                to={`/${item.path}`}
                className="py-3 px-2 text-foreground font-medium rounded-lg hover:bg-secondary/50 transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* روابط تسجيل الدخول للموبايل (اذا لم يسجل دخول فقط) */}
        {!user && (
          <div className="p-4 border-t border-border mt-auto">
            <Link
              to="/login"
              className="w-full py-3 text-white bg-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md"
              onClick={() => setOpen(false)}
            >
              <User size={18} />
              {t('navbar.login')}
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
