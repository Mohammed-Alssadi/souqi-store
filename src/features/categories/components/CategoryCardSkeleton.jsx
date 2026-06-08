import React from 'react'
function CategoryCardSkeleton() {
  return (
    <div className="animate-pulse bg-card border border-border rounded-xl flex flex-col items-center md:w-[180px] overflow-hidden">
      <div className="w-full bg-white dark:bg-zinc-600 flex items-center justify-center p-3">
        <div className="bg-gray-200 dark:bg-zinc-800 h-24 md:h-28 w-full rounded-lg"></div>
      </div>
      <div className="p-3 w-full flex justify-center border-t border-border/50">
        <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-2/3"></div>
      </div>
    </div>
  )




}

export default CategoryCardSkeleton
