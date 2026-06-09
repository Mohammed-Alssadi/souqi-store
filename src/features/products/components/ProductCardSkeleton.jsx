import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ProductCardSkeleton = () => {
  return (
    <Card className="border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full p-0">
      {/* صورة */}
      <div className="relative bg-secondary/10 flex justify-center items-center h-48 lg:h-52 w-full border-b border-border/20">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* تفاصيل */}
      <CardContent className="px-4 pt-3 flex-grow pb-0">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-1/2 mb-2" />
      </CardContent>

      <div className="px-4 pb-4 pt-0 flex flex-col justify-end">
        {/* السعر الموحد */}
        <div className="flex mt-2 items-center gap-3">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>

        {/* أزرار الشراء */}
        <div className="flex justify-between items-stretch gap-2 mt-4">
          <Skeleton className="flex-1 h-10 rounded-lg" />
          <Skeleton className="flex-1 h-10 rounded-lg" />
          <Skeleton className="flex-[2] h-10 rounded-lg" />
        </div>
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;
