import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Filter } from "lucide-react";
import { useMediaQuery } from "@mui/material";

// Stores
import { useProductStore } from "../store";
import { useCategoryStore } from "../../categories/store";

// Custom Hooks
import useProductFilters from "../hooks/useProductFilters";
import usePagination from "../../../hooks/usePagination";

// Components
import SlidbarFilter from "../components/SlidbarFilter";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../../../components/ui/Pagination";

/**
 * صفحة عرض جميع المنتجات (All Products Page)
 * تم إعادة هيكلتها لفصل المنطق (Logic) عن واجهة المستخدم (UI) باستخدام Custom Hooks
 */
export default function AllProducts() {
  const { t, i18n } = useTranslation();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  
  const products = useProductStore((state) => state.items);
  const categories = useCategoryStore((state) => state.items);

  // 1. التحكم في حالة ظهور قائمة الفلتر الجانبية
  const [visible, setVisible] = useState(false);

  // 2. إدارة منطق الفلترة باستخدام الخطاف المخصص
  const {
    filters,
    setFilters,
    loading,
    maxPrice,
    handleApplyFilters,
    handleResetFilters,
    filteredProducts,
  } = useProductFilters(products);

  // 3. إدارة التصفح (Pagination) باستخدام الخطاف المخصص
  const {
    currentItems,
    pageCount,
    handlePageClick,
    setCurrentPage,
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
    <div className="container px-1 min-h-[60vh]">
      {/* 🟢 رأس الصفحة وأيقونة الفلترة */}
      <div className="flex justify-between items-center py-2 md:py-4 px-2 md:px-5 rounded-lg bg-card">
        <h1 className="text-lg md:text-3xl font-semibold">{t('products.title', 'Products')}</h1>
        <button 
          className="flex items-center text-md md:text-lg rounded-xl px-1 md:px-3 cursor-pointer text-foreground hover:text-primary transition-colors"
          onClick={() => setVisible(true)}
        >
          {t('products.filter', 'filter')}
          <Filter
            size={isSmallScreen ? 35 : 45}
            className="text-primary py-2 px-1 rounded-lg hover:text-primary/80 transition"
          />
        </button>
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
      {filteredProducts.length === 0 && !loading && (
        <div className="flex justify-center items-center py-10">
          <p className="text-muted-foreground text-lg">{t('products.noProductsFound', 'No products found')}</p>
        </div>
      )}

      {/* 🟢 شبكة المنتجات (تتكفل بعرض Skeletons أثناء التحميل تلقائياً) */}
      <ProductGrid 
        items={currentItems} 
        loading={loading} 
        skeletonCount={10} 
        gridCols="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      />

      {/* 🟢 تذييل الصفحة: التصفح (Pagination) وعدد المنتجات */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-sm md:text-base mt-8 md:mt-12 md:pt-12 hidden md:inline-block">
            {t('products.showing', 'Showing {{count}} of {{total}} products', { count: currentItems.length, total: filteredProducts.length })}
          </p>
          
          <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
        </div>
      )}
    </div>
  );
}
