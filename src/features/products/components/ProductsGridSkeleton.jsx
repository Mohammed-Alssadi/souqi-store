import React from "react";
import ProductGrid from "./ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsGridSkeleton() {
  return (
    <div className="container py-4 md:py-5 px-1 min-h-[60vh]">
      {/* رأس الصفحة وأيقونة الفلترة (وهمي) */}
      <div className="flex justify-between items-center py-2 md:py-4 px-2 md:px-5 rounded-lg bg-card mb-6">
        <Skeleton className="h-8 md:h-10 w-32 md:w-48 rounded-md" />
        <Skeleton className="h-8 md:h-10 w-24 md:w-32 rounded-md" />
      </div>

      {/* شبكة المنتجات في حالة التحميل */}
      <ProductGrid 
        items={[]} 
        loading={true} 
        skeletonCount={12} 
        gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
      />
    </div>
  );
}
