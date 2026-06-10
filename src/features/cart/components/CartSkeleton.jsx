import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <Skeleton className="h-10 w-48 mb-10 rounded-md" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 🧺 قائمة المنتجات (وهمية) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="flex flex-col sm:flex-row items-center gap-6 p-4 border-border"
            >
              <Skeleton className="w-24 h-24 rounded-xl shrink-0" />
              <div className="flex-1 w-full text-center sm:text-start flex flex-col items-center sm:items-start gap-2">
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-md mt-1" />
                <Skeleton className="h-8 w-24 rounded-full mt-3" />
              </div>
              <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-border gap-2">
                <Skeleton className="h-6 w-16 rounded-md mb-2" />
                <Skeleton className="h-10 w-10 rounded-md sm:mt-3" />
              </div>
            </Card>
          ))}
        </div>

        {/* 💳 ملخص الطلب (وهمي) */}
        <Card className="p-6 h-fit sticky top-10 border-border">
          <Skeleton className="h-8 w-3/4 mb-6 pb-3 rounded-md" />
          <div className="border-b border-border mb-6"></div>

          <div className="flex flex-col gap-4 text-muted-foreground mb-6">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-5 w-12 rounded-md" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-5 w-16 rounded-md" />
            </div>
            <div className="border-t border-border pt-4 flex justify-between">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
          </div>

          <Skeleton className="h-14 w-full rounded-full mb-4" />
          <div className="flex justify-center">
            <Skeleton className="h-5 w-40 rounded-md" />
          </div>
        </Card>
      </div>
    </div>
  );
}
