// pages/SearchResultsPage.jsx
import { useProductStore } from '../../products/store';
import { useCategoryStore } from '../../categories/store';
import ProductCard from '../../products/components/ProductCard';
import CategoryCard from '../../categories/components/CategoryCard';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCardSkeleton from '../../products/components/ProductCardSkeleton';
import CategoryCardSkeleton from '../../categories/components/CategoryCardSkeleton';
import { useTranslation } from 'react-i18next';


const SearchResultsPage = () => {
  const products = useProductStore((state) => state.items || []);
  const categories = useCategoryStore((state) => state.items || []);
  const searchTerm = useProductStore((state) => state.searchTerm || '');
  
  // ✅ التحقق من صحة searchTerm
  const normalizedSearchTerm = (typeof searchTerm === 'string' ? searchTerm.trim() : '').toLowerCase();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);

  const resultProducts = normalizedSearchTerm
    ? products.filter((product) =>
        product.title_en?.toLowerCase().includes(normalizedSearchTerm) ||
        product.title_ar?.toLowerCase().includes(normalizedSearchTerm)
      )
    : [];

  const resultCategories = normalizedSearchTerm
    ? categories.filter((category) =>
        category.name_en?.toLowerCase().includes(normalizedSearchTerm) ||
        category.name_ar?.toLowerCase().includes(normalizedSearchTerm)
      )
    : [];

  // ✅ تحميل ذكي: إذا كانت البيانات جاهزة فورًا، لا نعرض Skeleton
  useEffect(() => {
    if (normalizedSearchTerm === '') {
      setIsLoading(false);
      return;
    }

    // محاكاة تأخير التحميل فقط إذا كانت هناك حاجة للبحث
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 0.5s أكثر واقعية من 3s

    return () => clearTimeout(timer);
  }, [normalizedSearchTerm]);

  // ✅ حالة عدم وجود أي نتائج (بعد انتهاء التحميل)
  const hasNoResults = !isLoading && normalizedSearchTerm && resultProducts.length === 0 && resultCategories.length === 0;

  return (
    <div className="container mx-auto px-4 py-8 min-h-[70vh]">
      {/* 🔙 العودة للصفحة الرئيسية */}
      {hasNoResults ? null :
   <Link
        to="/"
        className="text-primary hover:text-primary/80 mb-8 inline-block font-medium text-lg"
      >
        &larr; {t('search.backToHome', 'Back To Home')}
      </Link>

      }
   
      {/* 🔍 حالة عدم وجود نتائج */}
      {hasNoResults && (
        <div className=" h-96 lg:h-[70vh] flex flex-col justify-center items-center">
          <p className="text-center text-muted-foreground text-xl mb-4">{t('search.noResults', 'No results found for')} "{searchTerm}"</p>
          <Link
            to="/"
            className="text-center text-primary hover:text-primary/80 font-medium"
          >
            &larr; {t('search.backToHome', 'Back To Home')}
          </Link>
        </div>
      )}

      {/* عرض النتائج فقط إذا كان هناك مصطلح بحث */}
      {normalizedSearchTerm && !hasNoResults && (
        <>
          {/* 🏷️ التصنيفات */}
          {resultCategories.length > 0 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8">{t('search.categories', 'Categories')}</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {isLoading
                  ? Array.from({ length: Math.min(6, resultCategories.length || 6) }).map((_, i) => (
                      <CategoryCardSkeleton key={`cat-skel-${i}`} />
                    ))
                  : resultCategories.map((cat) => (
                      <CategoryCard key={cat.id} category={cat} />
                    ))}
              </div>
            </>
          )}

          {/* 🛍️ المنتجات */}
          {resultProducts.length > 0 || isLoading ? (
            <>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8">{t('search.products', 'Products')}</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {isLoading
                  ? Array.from({ length: Math.min(10, resultProducts.length || 10) }).map((_, i) => (
                      <ProductCardSkeleton key={`prod-skel-${i}`} />
                    ))
                  : resultProducts.length > 0
                  ? resultProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  : (
                      <p className="text-muted-foreground text-lg col-span-full text-center">
                        {t('search.noProductsMatch', 'No products match your search.')}
                      </p>
                    )}
              </div>
            </>
          ) : null}
        </>
      )}

      {/* حالة عدم إدخال أي مصطلح بحث */}
      {!normalizedSearchTerm && !isLoading && (
        <div className="text-center text-muted-foreground py-12">
          <p className="text-lg">{t('search.enterTerm', 'Enter a search term to find products or categories.')}</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;