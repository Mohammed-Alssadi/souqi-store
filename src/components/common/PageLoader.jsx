import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PageLoader = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-12 text-muted-foreground">
      <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary/60" />
      <span className="text-sm font-medium animate-pulse">{t('common.loading', 'Loading...')}</span>
    </div>
  );
};

export default PageLoader;
