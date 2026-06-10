import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useCategoryStore } from '../../categories/store';
import CategoryCard from '../components/CategoryCard';
import CategoryCardSkeleton from '../components/CategoryCardSkeleton';
import { Button } from '@/components/ui/button';
import SEO from '../../../components/common/SEO';
import { motion, AnimatePresence } from 'framer-motion';

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
        <>
            <SEO
                title={t('categories.allCategories', 'All Categories')}
                description={t('categories.allCategoriesDesc', 'Browse all categories to find the products you need.')}
                url="/categories"
            />
            <div className="min-h-[60vh] container mx-auto px-4 py-6 md:py-10">
                <h1 className='md:text-3xl text-xl mb-4 text-foreground'>{t('categories.allCategories', 'All Categories')}</h1>



            {loading ? (
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-3 md:gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <CategoryCardSkeleton key={i} />
                    ))}
                </div>

            ) : (

                <motion.div layout className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-3 md:gap-8">
                    <AnimatePresence>
                        {categories.map((cat, index) => {
                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    key={cat.id}
                                >
                                    <CategoryCard category={cat} />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

            )}






        </div>
        </>
    )
}

export default AllCategories