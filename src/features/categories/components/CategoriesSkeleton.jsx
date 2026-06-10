import React from 'react';
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesSkeleton() {
  return (
    <div className="min-h-[60vh] container mx-auto px-4 py-6 md:py-10">
      <Skeleton className="h-8 md:h-10 w-48 mb-6 rounded-md" />
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-3 md:gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
