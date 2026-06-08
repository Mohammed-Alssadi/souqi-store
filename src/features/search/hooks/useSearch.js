import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProductStore } from '../../products/store';
import { useCategoryStore } from '../../categories/store';

/**
 * هوك مخصص (Custom Hook) لمعالجة منطق البحث بالكامل.
 * يقوم بجلب المتغيرات من حالة التوجيه (Router State) بدلاً من الرابط (URL)،
 * فلترة المنتجات والتصنيفات، وإدارة حالة التحميل (Loading) والترقيم (Pagination).
 */
export const useSearch = (itemsPerPage = 10) => {
  // 1. قراءة كلمة البحث من حالة التوجيه (History State)
  const location = useLocation();
  const rawQuery = location.state?.q || '';
  const normalizedSearchTerm = rawQuery.trim().toLowerCase();

  // 2. جلب البيانات الأساسية من متجر الحالة (Zustand)
  const products = useProductStore((state) => state.items || []);
  const categories = useCategoryStore((state) => state.items || []);

  // 3. تعريف حالات المكون (States)
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  // 4. فلترة النتائج بناءً على كلمة البحث (للمنتجات والتصنيفات)
  const resultProducts = normalizedSearchTerm
    ? products.filter(
        (product) =>
          product.title_en?.toLowerCase().includes(normalizedSearchTerm) ||
          product.title_ar?.toLowerCase().includes(normalizedSearchTerm)
      )
    : [];

  const resultCategories = normalizedSearchTerm
    ? categories.filter(
        (category) =>
          category.name_en?.toLowerCase().includes(normalizedSearchTerm) ||
          category.name_ar?.toLowerCase().includes(normalizedSearchTerm)
      )
    : [];

  // 5. حساب عدد الصفحات بناءً على عدد المنتجات الناتجة
  const pageCount = Math.ceil(resultProducts.length / itemsPerPage);

  // 6. التعامل مع تغيير الصفحة في الترقيم
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // التمرير لأعلى الصفحة بنعومة
  };

  // 7. تأثير لتأخير بسيط (Simulation) يُظهر التحميل عند تغيير كلمة البحث
  useEffect(() => {
    if (normalizedSearchTerm === '') {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setCurrentPage(0); // تصفير الترقيم عند بدء بحث جديد
    
    // محاكاة تحميل سريع (نصف ثانية) لتجربة مستخدم أفضل (UX)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [normalizedSearchTerm]);

  // 8. متغير مساعد لمعرفة ما إذا كان البحث لم يسفر عن أي نتائج
  const hasNoResults =
    !isLoading &&
    normalizedSearchTerm !== '' &&
    resultProducts.length === 0 &&
    resultCategories.length === 0;

  // إرجاع كل البيانات والدوال اللازمة ليتم استخدامها في واجهة المستخدم
  return {
    rawQuery,
    normalizedSearchTerm,
    resultProducts,
    resultCategories,
    isLoading,
    currentPage,
    pageCount,
    hasNoResults,
    handlePageClick,
  };
};
