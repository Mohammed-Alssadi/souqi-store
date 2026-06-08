import React from 'react'
import { useTranslation } from "react-i18next";

const DiscountBadge = ({ oldPrice, price }) => {
  const { t } = useTranslation();
  // تأكد أن القيم صالحة
  if (!oldPrice || !price || oldPrice <= price) {
    return null; // لا تُظهر الخصم إذا لم يكن هناك تخفيض فعلي
  }

  const discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);

  return (
    <span className="absolute top-1 z-10 start-2 bg-red-500 text-white text-[10px] md:text-xs whitespace-nowrap px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm md:rounded-md">
      {discountPercent}% {t('products.off', 'OFF')}
    </span>
  );
};

export default DiscountBadge