import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <>
      <div className="container mx-auto px-2 md:px-6 py-4 md:py-5 min-h-[80vh]">
        {/* زر العودة */}
        <Skeleton className="h-6 w-32 mb-2 md:mb-6" />

        {/* الشبكة الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          {/* العمود الأول: الصور */}
          <div className="flex flex-col items-center rounded px-2 md:px-5 pb-0 lg:pb-12 w-full max-w-md mx-auto">
            {/* الصورة الرئيسية */}
            <Skeleton className="w-full h-[300px] md:h-[400px] rounded-2xl mb-4" />
            
            {/* الصور المصغرة */}
            <div className="flex gap-2.5 w-full h-24 overflow-hidden">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="flex-1 h-full rounded-xl" />
              ))}
            </div>
          </div>

          {/* العمود الثاني: التفاصيل */}
          <div className="flex flex-col justify-center items-start text-start md:justify-around mt-4 md:mt-0 px-2 w-full">
            <div className="w-full">
              {/* العنوان */}
              <Skeleton className="h-8 md:h-12 w-3/4 mb-4" />

              {/* التقييم */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-5 w-5 rounded-full" />
                  ))}
                </div>
                <Skeleton className="h-4 w-10 ms-2" />
              </div>

              {/* السعر */}
              <div className="mb-5 flex gap-3 items-center">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>

              {/* الوصف */}
              <div className="space-y-2 mb-6 w-full">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[80%]" />
              </div>

              {/* التصنيف والمبيعات (الشبكة) */}
              <div className="grid grid-cols-2 md:grid-cols-3 md:gap-10 gap-5 mb-6 w-full">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* أزرار الإضافة للسلة والشراء */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-5 w-full mt-4">
              <Skeleton className="flex-1 h-16 rounded-xl" />
              <Skeleton className="flex-1 h-16 rounded-xl" />
            </div>
          </div>
        </div>

        {/* قسم "عن المنتج" */}
        <div className="container mx-auto border-t mt-10">
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[85%]" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
