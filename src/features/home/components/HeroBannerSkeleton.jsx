import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HeroBannerSkeleton() {
  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center h-[70vh] md:h-[80vh] w-full">
        
        {/* Skeleton Text Area */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 pt-10 pb-6 md:py-10 md:px-16 lg:px-24 h-auto md:h-full relative z-10">
          <div className="flex flex-col items-start w-full">
            {/* Badge */}
            <Skeleton className="h-8 w-32 rounded-full mb-4 md:mb-6" />
            
            {/* Title */}
            <Skeleton className="h-12 md:h-16 w-3/4 mb-4" />
            <Skeleton className="h-12 md:h-16 w-2/3 mb-6" />
            
            {/* Subtitle */}
            <Skeleton className="h-5 md:h-6 w-full max-w-lg mb-3" />
            <Skeleton className="h-5 md:h-6 w-4/5 max-w-lg mb-6 md:mb-8" />
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-32 rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Skeleton Image Area */}
        <div className="w-full md:w-1/2 h-[30vh] md:h-[90%] md:p-6 lg:p-10">
          <Skeleton className="w-full h-full rounded-md md:rounded-lg shadow-sm" />
        </div>
      </div>
    </div>
  );
}
