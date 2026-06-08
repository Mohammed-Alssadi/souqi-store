// components/ProductCardSkeleton.jsx
import React from "react";
import { Skeleton, Box } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <div className="border border-border rounded-xl shadow-sm bg-card animate-pulse overflow-hidden">
      {/* صورة */}
      <div className="relative bg-white dark:bg-zinc-700 flex justify-center items-center h-[208px]">
        <div className="bg-gray-200 dark:bg-zinc-700 w-full h-full rounded-t-xl" />
      </div>

      {/* تفاصيل */}
      <div className="px-4 pb-4 pt-3">
        <div className="bg-secondary dark:bg-zinc-700 h-6 w-3/4 rounded mb-3" />
        <div className="bg-secondary dark:bg-zinc-700 h-5 w-1/2 rounded mb-2" />
        <div className="bg-secondary dark:bg-zinc-700 h-4 w-full rounded mb-4" />

        <div className="flex justify-between items-center mt-3 gap-2">
          <div className="bg-secondary dark:bg-zinc-700 h-10 w-1/3 rounded-lg" />
          <div className="bg-secondary dark:bg-zinc-700 h-10 w-1/3 rounded-lg" />
          <div className="bg-secondary dark:bg-zinc-700 h-10 w-1/3 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
