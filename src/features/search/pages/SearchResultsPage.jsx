// pages/SearchResultsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

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

  // دالة لتوليد أزرار الترقيم بشكل احترافي مع دعم النقاط (...)
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pageCount - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    if (startPage > 0) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageClick({ selected: 0 }); }}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 1) {
        items.push(<PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            href="#" 
            isActive={currentPage === i}
            onClick={(e) => { e.preventDefault(); handlePageClick({ selected: i }); }}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < pageCount - 1) {
      if (endPage < pageCount - 2) {
        items.push(<PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>);
      }
      items.push(
        <PaginationItem key="last">
          <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageClick({ selected: pageCount - 1 }); }}>{pageCount}</PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

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
          <Button variant="link" className="text-center font-medium px-0" asChild>
            <Link to="/">
              {isAr ? <ChevronRight className="w-4 h-4 mr-2" /> : <ChevronLeft className="w-4 h-4 mr-2" />}
              {t('search.backToHome', 'Back To Home')}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // ===================== [3] العرض الأساسي: عرض النتائج =====================
  return (
    <div className="container mx-auto px-4 py-8 min-h-[70vh]">
      {/* زر العودة للصفحة الرئيسية */}
      <Button variant="link" className="mb-8 font-medium text-lg px-0" asChild>
        <Link to="/">
          {isAr ? <ChevronRight className="w-4 h-4 rtl:ml-2 ltr:mr-2" /> : <ChevronLeft className="w-4 h-4 rtl:ml-2 ltr:mr-2" />}
          {t('search.backToHome', 'Back To Home')}
        </Link>
      </Button>

      {/* قسم عرض التصنيفات (إن وُجدت) */}
      {resultCategories.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">
            {t('search.categories', 'Categories')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
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
            <div className="flex justify-center mt-12 pb-8 w-full" dir="ltr">
              <Pagination>
                <PaginationContent className={cn("gap-1 md:gap-2", isAr ? "flex-row-reverse" : "flex-row")}>
                  <PaginationItem>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); if (currentPage > 0) handlePageClick({ selected: currentPage - 1 }); }}
                      className={cn("gap-1 px-2.5", currentPage === 0 ? "pointer-events-none opacity-50" : "")}
                      aria-label="Go to previous page"
                    >
                      {isAr ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                      <span className="hidden sm:inline-block">{t('pagination.previous', 'Previous')}</span>
                    </PaginationLink>
                  </PaginationItem>
                  
                  {renderPaginationItems()}
                  
                  <PaginationItem>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); if (currentPage < pageCount - 1) handlePageClick({ selected: currentPage + 1 }); }}
                      className={cn("gap-1 px-2.5", currentPage === pageCount - 1 ? "pointer-events-none opacity-50" : "")}
                      aria-label="Go to next page"
                    >
                      <span className="hidden sm:inline-block">{t('pagination.next', 'Next')}</span>
                      {isAr ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;