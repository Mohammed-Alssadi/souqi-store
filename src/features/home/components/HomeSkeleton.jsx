import React from "react";
import HeroBannerSkeleton from "./HeroBannerSkeleton";
import CategoryCardSkeleton from "../../categories/components/CategoryCardSkeleton";
import ProductCardSkeleton from "../../products/components/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeSkeleton() {
  return (
    <div className="w-full">
      {/* Hero Banner Skeleton */}
      <HeroBannerSkeleton />
      
      <div className='w-full px-2 sm:px-4 md:container md:mx-auto md:px-5'>
        
        {/* Categories Section Skeleton */}
        <div className="mt-5 pt-5 md:mt-10 md:pt-10">
          <div className="flex justify-between items-end mb-6 px-4">
             <Skeleton className="h-8 md:h-10 w-48 rounded-md" />
             <Skeleton className="h-8 w-24 rounded-full" />
          </div>
          <div className="flex gap-4 px-4 pb-2 mb-8 overflow-hidden">
            {Array.from({ length: 6 }).map((_, idx) => (
               <div key={idx} className="w-[100%] min-[480px]:w-[40%] sm:w-[25%] md:w-[22%] lg:w-[20%] xl:w-[16%] shrink-0 px-1 pb-8 mb-4">
                 <CategoryCardSkeleton />
               </div>
            ))}
          </div>
        </div>
        
        {/* Delivery / Features Skeleton */}
        <section className="my-10 md:my-20">
           <div className="text-center mb-10 flex flex-col items-center">
              <Skeleton className="h-8 md:h-10 w-64 mb-4 rounded-md" />
              <Skeleton className="h-4 w-full max-w-md rounded-md" />
           </div>
           <div className="bg-card md:mx-auto md:shadow-none p-6 md:p-10 rounded-none md:rounded-[24px] text-card-foreground">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
               {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center gap-4">
                     <Skeleton className="w-16 h-16 rounded-2xl" />
                     <Skeleton className="h-6 w-32 rounded-md" />
                     <Skeleton className="h-4 w-48 rounded-md" />
                  </div>
               ))}
             </div>
           </div>
        </section>

        {/* Products Section Skeleton */}
        <section className="my-10">
           <div className="flex justify-between items-end mb-6 px-4">
             <Skeleton className="h-8 md:h-10 w-56 rounded-md" />
             <Skeleton className="h-8 w-24 rounded-full" />
          </div>
          <div className="flex gap-3 sm:gap-4 md:gap-6 overflow-hidden mt-2 pt-2 pb-2 mb-8 px-4">
             {Array.from({ length: 6 }).map((_, idx) => (
               <div key={idx} className="w-[100%] min-[480px]:w-[48%] sm:w-[38%] md:w-[27%] lg:w-[23%] xl:w-[18.5%] 2xl:w-[15.5%] shrink-0 px-1 mb-12">
                 <ProductCardSkeleton />
               </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
}
