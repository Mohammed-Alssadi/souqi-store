import React, { } from 'react'
import CategoryCard from '../components/CategoryCard'
import { useCategoryStore } from '../../categories/store'
import { useState, useEffect } from 'react';
import CategoryCardSkeleton from '../components/CategoryCardSkeleton';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function AllCategories() {
    const { t } = useTranslation();
    const categories = useCategoryStore((state) => state.items);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        const taimer = setTimeout(() => {
            setLoading(false)
        }, 1000);
        return () => clearTimeout(taimer);
    }, []);


    if (categories.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-2xl font-bold text-red-500 mb-4">404!</h1>
                <p className="text-gray-600">{t('categories.notFound', 'Page Not Found.')}</p>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                    {t('categories.returnHome', 'Return to Home')}
                </Link>
            </div>
        );
    }


    return (

        <div className="min-h-[60vh]">


            <h1 className='my-4 text-3xl font-semibold  '> {t('categories.allCategories', 'All Categories')}</h1>



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