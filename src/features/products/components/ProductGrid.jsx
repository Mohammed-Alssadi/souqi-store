import React from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

import { motion, AnimatePresence } from "framer-motion";

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
  gridCols = "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
}) {
  return (
    <motion.div 
      layout
      className={`grid ${gridCols} gap-3 md:gap-6 mt-6`}
    >
      <AnimatePresence mode="popLayout">
        {loading ? (
          Array.from({ length: skeletonCount }).map((_, index) => (
            <motion.div
              key={`skeleton-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductCardSkeleton />
            </motion.div>
          ))
        ) : (
          items.map((product, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={product.id}
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
}
