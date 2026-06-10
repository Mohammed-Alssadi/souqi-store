import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FullScreenSplash = ({ isFadingOut }) => {
  const { t, i18n } = useTranslation();

  const isAr = i18n?.language?.startsWith('ar') || false;

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Animated rings for a professional splash look */}
        <div className="absolute w-32 h-32 border-4 border-primary/20 rounded-full animate-ping duration-1000"></div>
        <div className="absolute w-24 h-24 border-4 border-primary/40 rounded-full animate-pulse duration-700"></div>

        {/* Logo Mockup */}
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl z-10 animate-bounce">
          <span className="text-primary-foreground font-bold text-4xl">S</span>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-foreground tracking-widest uppercase mb-2">
          {i18n.language.startsWith('ar') ? 'سوقي' : 'Souqi'}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground">

          <span className="text-md text-primary/80 tracking-wide animate-pulse">
            {t('common.loading', 'Loading...')}
          </span>
          <Loader2 className="w-5 h-5 animate-spin text-primary/80 " />
        </div>
      </div>
    </div>
  );
};

export default FullScreenSplash;
