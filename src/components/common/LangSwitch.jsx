import React from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";

export function LangSwitch({ className }) {
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  return (
    <div className={`flex items-center gap-1.5 ${className || ''}`}>
      <span className={`text-[10px] font-bold ${!isEn ? 'text-foreground dark:text-zinc-200' : 'text-muted-foreground'}`}>AR</span>
      <Switch
        className="dark:bg-"
        checked={isEn}
        onCheckedChange={(checked) => i18n.changeLanguage(checked ? "en" : "ar")}
        icon={<Globe size={12} className="text-primary" />}
        title={isEn ? "Switch to Arabic" : "Switch to English"}
      />
      <span className={`text-[10px] font-bold ${isEn ? 'text-foreground dark:text-zinc-200' : 'text-muted-foreground'}`}>EN</span>
    </div>
  );
}
