import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PageLoader = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex items-center justify-center p-12 text-muted-foreground">
      <Loader2 className="w-6 h-6 animate-spin mr-3" />
      <span className="text-sm font-medium animate-pulse">{t('common.loading', 'Loading...')}</span>
    </div>
  );
};

export default PageLoader;
