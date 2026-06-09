import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Stores
import { useProductStore } from '../store';
import { useCategoryStore } from '../../categories/store';

// Custom Hooks
import usePagination from '../../../hooks/usePagination';

// Components
import ProductGrid from '../components/ProductGrid';
import Pagination from '../../../components/ui/Pagination';

/**
 * صفحة عرض المنتجات حسب التصنيف (Products by Category Page)
 * تعرض منتجات تصنيف معين وتدعم التصفح (Pagination)
 */
export default function ProductByCategory() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');
  
  const categories = useCategoryStore((state) => state.items);
  const products = useProductStore((state) => state.items);
  
  // حالة التحميل (لإظهار Skeletons)
  const [loading, setLoading] = useState(true);

  // البحث عن التصنيف الحالي بناءً على الرابط
  const currentCategory = useMemo(() => {
    return categories.find((category) => category.slug === slug);
  }, [categories, slug]);

  // تصفية المنتجات التي تنتمي لهذا التصنيف
  const filteredProducts = useMemo(() => {
    if (!currentCategory) return [];
    return products.filter((product) => product.category === currentCategory.name_en);
  }, [products, currentCategory]);

  // إدارة التصفح (Pagination) باستخدام الخطاف المخصص
  const {
    currentItems,
    pageCount,
    handlePageClick,
    setCurrentPage,
  } = usePagination(filteredProducts, 8); // هنا نعرض 8 منتجات في كل صفحة

  // محاكاة تأخير التحميل عند تغيير التصنيف
  useEffect(() => {
    setLoading(true);
    setCurrentPage(0); // إعادة الصفحة الأولى عند تبديل التصنيف
    
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [slug, setCurrentPage]);

  // إذا لم يتم العثور على التصنيف
  if (!currentCategory) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">404!</h1>
        <p className="text-muted-foreground">{t('category.notFound', 'Page Not Found.')}</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block font-medium">
          {t('category.returnHome', 'Return to Home')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 md:px-4 py-2 md:py-8 min-h-[50vh]">
      {/* 🟢 عنوان التصنيف */}
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 md:pt-4 text-start text-foreground">
        {isAr ? currentCategory.name_ar : currentCategory.name_en}
      </h1>

      {/* 🟢 رسالة عند عدم وجود منتجات في هذا التصنيف */}
      {!loading && filteredProducts.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-10">
          <p className="text-center text-muted-foreground text-lg">
            {t('category.noProducts', 'No products found for')} {isAr ? currentCategory.name_ar : currentCategory.name_en}
          </p>
          <Link
            to="/#categories"
            className="text-center text-primary hover:text-primary/80 my-4 font-bold transition-colors"
          >
            <span className={isAr ? "rotate-180 inline-block" : "inline-block"}>&larr;</span> {t('category.backToCategories', 'Back To Categories')}
          </Link>
        </div>
      ) : (
        <>
          {/* 🟢 شبكة المنتجات (تدعم حالة التحميل تلقائياً) */}
          <ProductGrid 
            items={currentItems} 
            loading={loading} 
            skeletonCount={8} 
            gridCols="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
          />

          {/* 🟢 تذييل الصفحة: التصفح (Pagination) */}
          {!loading && filteredProducts.length > 0 && (
            <div className="flex justify-between items-center w-full">
              <p className="text-muted-foreground text-sm md:text-base mt-8 md:mt-12 md:pt-12 hidden md:inline-block">
                {t('products.showing', 'Showing {{count}} of {{total}} products', { count: currentItems.length, total: filteredProducts.length })}
              </p>
              
              <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
            </div>
          )}
        </>
      )}
    </div>
  );
}