import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useCategoryStore } from '../../categories/store';
import CategoryCard from '../components/CategoryCard';
import CategoryCardSkeleton from '../components/CategoryCardSkeleton';
import { Button } from '@/components/ui/button';

function AllCategories() {
    const { t } = useTranslation();
    const categories = useCategoryStore((state) => state.items);
    const loading = useCategoryStore((state) => state.isLoading);


    if (!loading && categories.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-bold text-destructive mb-4">404</h1>
                <p className="text-muted-foreground mb-6 text-lg">{t('categories.notFound', 'Page Not Found.')}</p>
                <Button asChild>
                    <Link to="/">{t('categories.returnHome', 'Return to Home')}</Link>
                </Button>
            </div>
        );
    }


    return (

        <div className="min-h-[60vh] container mx-auto px-4">
            <h1 className='my-6 text-3xl font-bold text-foreground'>{t('categories.allCategories', 'All Categories')}</h1>



            {loading ? (
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-3 md:gap-4">
                    {categories.map((cat) => {
                        return <CategoryCardSkeleton key={cat.id} />
                    })}
                </div>

            ) : (

                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-3 md:gap-8">
                    {categories.map((cat) => {
                        return <CategoryCard key={cat.id} category={cat} />

                    })}

                </div>

            )}






        </div>



    )
}

export default AllCategories