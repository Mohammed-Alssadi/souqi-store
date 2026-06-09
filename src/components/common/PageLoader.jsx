import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PageLoader = () => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-300">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 border-4 border-primary/20 rounded-full animate-ping"></div>
        <div className="absolute w-16 h-16 border-4 border-primary/40 rounded-full animate-pulse"></div>
        <Loader2 className="w-10 h-10 text-primary animate-spin z-10" />
      </div>
      <p className="mt-8 text-lg font-medium text-muted-foreground animate-pulse">
        {t('common.loading', 'Loading...')}
      </p>
    </div>
  );
};

export default PageLoader;
