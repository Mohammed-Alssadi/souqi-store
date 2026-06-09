import React from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

/**
 * مكون لعرض شبكة المنتجات (Product Grid)
 * يدعم حالة التحميل (Loading Skeletons)
 * 
 * @param {Array} items - مصفوفة المنتجات المراد عرضها
 * @param {boolean} loading - حالة التحميل
 * @param {number} skeletonCount - عدد الـ Skeletons المراد عرضها أثناء التحميل
 * @param {string} gridCols - كلاسات Tailwind لتحديد عدد الأعمدة
 */
export default function ProductGrid({ 
  items = [], 
  loading = false, 
  skeletonCount = 5,
  gridCols = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
}) {
  return (
    <div className={`grid ${gridCols} gap-3 md:gap-6 mt-6`}>
      {loading ? (
        Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))
      ) : (
        items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}
