// pages/SearchResultsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// استيراد الهوك المخصص للبحث
import { useSearch } from '../hooks/useSearch';

// استيراد مكونات العرض (Components) والهياكل الوهمية (Skeletons)
import ProductCard from '../../products/components/ProductCard';
import ProductCardSkeleton from '../../products/components/ProductCardSkeleton';
import CategoryCard from '../../categories/components/CategoryCard';
import CategoryCardSkeleton from '../../categories/components/CategoryCardSkeleton';

const ITEMS_PER_PAGE = 10;

const SearchResultsPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');

  // استخدام الهوك المخصص لفصل المنطق (Logic) عن واجهة المستخدم (UI)
  const {
    rawQuery,
    normalizedSearchTerm,
    resultProducts,
    resultCategories,
    isLoading,
    currentPage,
    pageCount,
    hasNoResults,
    handlePageClick,
  } = useSearch(ITEMS_PER_PAGE);

  // ===================== [1] حالة: لا يوجد مصطلح بحث =====================
  if (!normalizedSearchTerm && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[70vh] flex flex-col justify-center items-center">
        <p className="text-xl text-muted-foreground mb-6">
          {t('search.enterTerm', 'Enter a search term to find products or categories.')}
        </p>
      </div>
    );
  }

  // ===================== [2] حالة: لا توجد أي نتائج مطابقة =====================
  if (hasNoResults) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[70vh]">
        <div className="h-96 lg:h-[70vh] flex flex-col justify-center items-center">
          <p className="text-center text-muted-foreground text-xl mb-4">
            {t('search.noResults', 'No results found for')} <span className="font-bold text-foreground">"{rawQuery}"</span>
          </p>
          <Link
            to="/"
            className="text-center text-primary hover:text-primary/80 font-medium"
          >
            &larr; {t('search.backToHome', 'Back To Home')}
          </Link>
        </div>
      </div>
    );
  }

  // ===================== [3] العرض الأساسي: عرض النتائج =====================
  return (
    <div className="container mx-auto px-4 py-8 min-h-[70vh]">
      {/* زر العودة للصفحة الرئيسية */}
      <Link
        to="/"
        className="text-primary hover:text-primary/80 mb-8 inline-block font-medium text-lg transition-colors"
      >
        &larr; {t('search.backToHome', 'Back To Home')}
      </Link>

      {/* قسم عرض التصنيفات (إن وُجدت) */}
      {resultCategories.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">
            {t('search.categories', 'Categories')}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {isLoading
              ? Array.from({ length: Math.min(6, resultCategories.length || 6) }).map((_, i) => (
                  <CategoryCardSkeleton key={`cat-skel-${i}`} />
                ))
              : resultCategories.map((cat) => (
                  <CategoryCard key={cat.id} category={cat} />
                ))}
          </div>
        </div>
      )}

      {/* قسم عرض المنتجات (إن وُجدت أو أثناء التحميل) */}
      {(resultProducts.length > 0 || isLoading) && (
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            {t('search.products', 'Products')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
            {isLoading
              ? Array.from({ length: Math.min(ITEMS_PER_PAGE, resultProducts.length || ITEMS_PER_PAGE) }).map((_, i) => (
                  <ProductCardSkeleton key={`prod-skel-${i}`} />
                ))
              : resultProducts
                  .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
          </div>

          {/* ترقيم الصفحات (Pagination) للمنتجات - يظهر فقط إذا كانت المنتجات تتجاوز صفحة واحدة */}
          {pageCount > 1 && !isLoading && (
            <div className="flex justify-center mt-12 pb-8 w-full">
              <ReactPaginate
                previousLabel={isAr ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                nextLabel={isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"flex items-center gap-1 md:gap-2"}
                pageClassName={"w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-border rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer text-sm font-medium bg-card"}
                previousClassName={"w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-border rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer bg-card"}
                nextClassName={"w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-border rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer bg-card"}
                activeClassName={"!bg-primary text-primary-foreground !border-primary shadow-sm pointer-events-none"}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;