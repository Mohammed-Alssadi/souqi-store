import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

function CategoryCard({ category }) {
  const { i18n } = useTranslation();

  if (!category) {
    return null;
  }

  const categoryName = i18n.language.startsWith('ar') ? category.name_ar : category.name_en;

  return (
    <Link to={`/category/${category.slug}`} className="block w-full">
      <Card className="transition-all duration-300 group cursor-pointer overflow-hidden border-none  shadow-none hover:shadow-xs">
        <CardContent className="p-0 flex flex-col items-center">
          <div className="w-full bg-white dark:bg-white flex items-center justify-center p-3 border- border-border/20">
            <img
              src={category.image}
              alt={categoryName}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="mx-auto h-28 object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="p-3 w-full text-center border- border-border/50">
            <p className="text-foreground font-medium text-base truncate">{categoryName}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CategoryCard;