import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useAuthStore } from "../../../features/auth/store";
import { ThemeToggle } from "../../common/ThemeToggle";
import { LangSwitch } from "../../common/LangSwitch";
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

  const openSearch = () => {
    setOpen(false);
    onOpenSearch();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden rounded-full hover:bg-transparent w-10 h-10">
          <Menu size={30} strokeWidth={1.75} />
        </Button>
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

        <div className="flex-1 overflow-y-auto flex flex-col py-2">
          


          {/* الروابط الأساسية */}
          <div className="flex flex-col px-3 gap-1">
            {[
              { name: t('navbar.home'), path: "" },
              { name: t('navbar.categories'), path: "categories" },
              { name: t('navbar.products'), path: "products" },
            ].map((item) => (
              <Link
                key={item.name}
                to={`/${item.path}`}
                className="py-3.5 px-4 text-foreground font-medium rounded-xl hover:bg-secondary/60 active:bg-secondary transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* التفضيلات */}
          <div className="px-5 py-4 mt-auto">
             <div className="h-[1px] bg-border w-full mb-5"></div>
             <p className="text-[11px] font-bold text-muted-foreground mb-4 uppercase tracking-wider">
               {i18n.language.startsWith('ar') ? 'التفضيلات' : 'Preferences'}
             </p>
             <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{i18n.language.startsWith('ar') ? 'المظهر' : 'Theme'}</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{i18n.language.startsWith('ar') ? 'اللغة' : 'Language'}</span>
                  <LangSwitch />
                </div>
             </div>
          </div>
        </div>

        {/* روابط تسجيل الدخول للموبايل (اذا لم يسجل دخول فقط) */}
        {!user && (
          <div className="p-4 border-t border-border mt-auto">
            <Button asChild className="w-full h-12 rounded-xl font-bold shadow-md text-base">
              <Link to="/login" onClick={() => setOpen(false)}>
                <User size={18} className="me-2" />
                {t('navbar.login')}
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
