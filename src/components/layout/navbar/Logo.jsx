import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Logo() {
  const { i18n } = useTranslation();

  return (
    <Link to="/" className="flex items-center group">
      {i18n.language.startsWith('ar') ? (
        <div className="flex items-center font-logo-rest-ar font-black" dir="rtl">
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
  );
}
