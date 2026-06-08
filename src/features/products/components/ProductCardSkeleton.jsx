import React from "react";
import { Skeleton } from "../../../components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="border border-border rounded-xl shadow-sm bg-card overflow-hidden flex flex-col h-full">
      {/* صورة */}
      <Skeleton className="rounded-none rounded-t-xl h-28 sm:h-32 md:h-52 w-full" />

      {/* تفاصيل */}
      <div className="px-1.5 md:px-4 pt-1 md:pt-3">
        <Skeleton className="h-3 md:h-6 w-3/4 mb-1 md:mb-3" />
        <Skeleton className="h-2 md:h-4 w-1/2 mb-0.5 md:mb-2" />
      </div>

      <div className="px-1.5 md:px-4 pb-1.5 md:pb-4 pt-0 flex flex-col justify-end">
        {/* السعر للموبايل */}
        <div className="flex md:hidden flex-col mt-0.5">
          <Skeleton className="h-3 w-1/3 mb-0.5" />
          <Skeleton className="h-2 w-1/4" />
        </div>

        {/* السعر للشاشات الكبيرة */}
        <div className="hidden md:flex mt-2 items-center gap-3">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>

        {/* أزرار الشراء */}
        <div className="flex justify-between items-stretch gap-1 md:gap-2 mt-1.5 md:mt-4">
          <Skeleton className="flex-1 h-6 md:h-10 rounded md:rounded-lg" />
          <Skeleton className="flex-1 h-6 md:h-10 rounded md:rounded-lg" />
          <Skeleton className="flex-[2] h-6 md:h-10 rounded md:rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
