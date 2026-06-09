import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function CategoryCardSkeleton() {
  return (
    <Card className="w-full overflow-hidden border-border/50">
      <CardContent className="p-0 flex flex-col items-center">
        <div className="w-full bg-secondary/10 flex items-center justify-center p-3 border-b border-border/20">
        <Skeleton className="w-28 h-28 rounded-md" />
      </div>
      <div className="p-3 w-full border-t border-border/50">
        <Skeleton className="h-5 w-3/4 mx-auto" />
      </div>
      </CardContent>
    </Card>
  );
}

export default CategoryCardSkeleton;
