import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FileQuestion, ArrowRight, ArrowLeft } from "lucide-react";

function NotFound() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-background px-4 py-12">
      <div className="text-center max-w-md w-full">
        
        {/* Animated Icon Container */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-primary/10 rounded-full flex items-center justify-center relative animate-[bounce_3s_infinite]">
              <FileQuestion size={48} className="text-primary sm:w-16 sm:h-16" />
            </div>
          </div>
        </div>

        {/* 404 Typography */}
        <h1 className="text-7xl sm:text-9xl font-black text-foreground mb-4 tracking-tighter drop-shadow-sm">
          4<span className="text-primary">0</span>4
        </h1>

        {/* Content */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          {t('notFound.title', 'Page Not Found')}
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed px-2">
          {t('notFound.desc', 'Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.')}
        </p>

        {/* Action Button */}
        <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl w-full sm:w-auto"
        >
          {isAr ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          {t('notFound.button', 'Back to Home')}
        </Link>
        
      </div>
    </div>
  );
}

export default NotFound;
