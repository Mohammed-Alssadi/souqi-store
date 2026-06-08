import React from 'react'
import { useTranslation } from "react-i18next";

const DiscountBadge = ({ oldPrice, price }) => {
  const { t } = useTranslation();
  // تأكد أن القيم صالحة
  if (!oldPrice || !price || oldPrice <= price) {
    return null; // لا تُظهر الخصم إذا لم يكن هناك تخفيض فعلي
  }

  const discountPercent = (((oldPrice - price) / oldPrice) * 100).toFixed(2);

  return (
    <span className="absolute top-1 z-10 start-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
      {discountPercent}% {t('products.off', 'OFF')}
    </span>
  );
};

export default DiscountBadge