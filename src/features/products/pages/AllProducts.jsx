import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Stores
import { useProductStore } from "../store";
import { useCategoryStore } from "../../categories/store";

// Custom Hooks
import useProductFilters from "../hooks/useProductFilters";
import usePagination from "../../../hooks/usePagination";

// Components
import SlidbarFilter from "../components/SlidbarFilter";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../../../components/common/Pagination";

/**
 * صفحة عرض جميع المنتجات (All Products Page)
 * تم إعادة هيكلتها لفصل المنطق (Logic) عن واجهة المستخدم (UI) باستخدام Custom Hooks
 */
export default function AllProducts() {
  const { t, i18n } = useTranslation();
  
  const products = useProductStore((state) => state.items);
  const isStoreLoading = useProductStore((state) => state.isLoading);
  const categories = useCategoryStore((state) => state.items);

  // 1. التحكم في حالة ظهور قائمة الفلتر الجانبية
  const [visible, setVisible] = useState(false);

  // 2. إدارة منطق الفلترة باستخدام الخطاف المخصص
  const {
    filters,
    setFilters,
    loading: filterLoading,
    maxPrice,
    handleApplyFilters,
    handleResetFilters,
    filteredProducts,
  } = useProductFilters(products);

  const isPageLoading = isStoreLoading || filterLoading;

  // 3. إدارة التصفح (Pagination) باستخدام الخطاف المخصص
  const {
    currentItems,
    pageCount,
    handlePageClick,
    setCurrentPage,
    currentPage,
  } = usePagination(filteredProducts, 10);

  // معالجات أحداث الفلترة لربطها بصفحة المنتجات
  const onApply = () => {
    handleApplyFilters(() => {
      setCurrentPage(0); // العودة للصفحة الأولى
      setVisible(false); // إغلاق القائمة
    });
  };

  const onReset = () => {
    handleResetFilters(() => {
      setCurrentPage(0); // العودة للصفحة الأولى
    });
  };

  return (
    <div className="container py-4 md:py-5 px-1 min-h-[60vh]">
      {/* 🟢 رأس الصفحة وأيقونة الفلترة */}
      <div className="flex justify-between items-center py-2 md:py-4 px-2 md:px-5 rounded-lg bg-card">
        <h1 className="text-lg md:text-3xl font-semibold">{t('products.title', 'Products')}</h1>
        <Button 
          variant="ghost"
          className="flex items-center text-md md:text-lg rounded-xl px-2 md:px-4 text-foreground hover:text-primary transition-colors h-auto py-2"
          onClick={() => setVisible(true)}
        >
          {t('products.filter', 'filter')}
          <Filter
            className="w-6 h-6 md:w-8 md:h-8 text-primary ms-2"
          />
        </Button>
      </div>

      {/* 🟢 قائمة الفلترة الجانبية */}
      <SlidbarFilter
        visible={visible}
        setVisible={setVisible}
        filters={filters}
        setFilters={setFilters}
        onApply={onApply}
        onReset={onReset}
        maxPrice={maxPrice}
        categories={categories}
      />

      {/* 🟢 رسالة عدم وجود منتجات */}
      {filteredProducts.length === 0 && !isPageLoading && (
        <div className="flex justify-center items-center py-10">
          <p className="text-muted-foreground text-lg">{t('products.noProductsFound', 'No products found')}</p>
        </div>
      )}

      {/* 🟢 شبكة المنتجات (تتكفل بعرض Skeletons أثناء التحميل تلقائياً) */}
      <ProductGrid 
        items={currentItems} 
        loading={isPageLoading} 
        skeletonCount={10} 
        gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      />

      {/* 🟢 تذييل الصفحة: التصفح (Pagination) وعدد المنتجات */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-between items-center w-full mt-4 md:mt-12 md:pt-4 pb-8">
          <p className="text-muted-foreground text-sm md:text-base hidden md:inline-block">
            {t('products.showing', 'Showing {{count}} of {{total}} products', { count: currentItems.length, total: filteredProducts.length })}
          </p>
          
          <Pagination pageCount={pageCount} onPageChange={handlePageClick} currentPage={currentPage} />
        </div>
      )}
    </div>
  );
}
