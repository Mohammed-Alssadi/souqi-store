import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-[100px] text-pink-900 font-bold mb-4">404</h1>
      <p className="text-xl text-gray-500"> {t('categories.notFound', 'Page Not Found')}</p>
      
      <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          {t('categories.returnHome', 'Return to Home')}
      </Link>
    </div>
  );
}

export default NotFound;
