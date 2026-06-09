import { useState, useMemo } from "react";

/**
 * خطاف مخصص لإدارة عمليات فلترة المنتجات وترتيبها
 * 
 * @param {Array} products - قائمة المنتجات الأصلية المراد فلترتها
 * @returns {Object} { filters, setFilters, appliedFilters, loading, handleApplyFilters, handleResetFilters, filteredProducts, maxPrice }
 */
export default function useProductFilters(products = []) {
  // حساب الحد الأقصى للسعر بناءً على المنتجات المتاحة (افتراضياً 1000 إذا لم يوجد)
  const maxPrice = useMemo(() => {
    if (!products.length) return 1000;
    return Math.max(...products.map(p => p.price), 1000);
  }, [products]);

  // القيم الحالية للفلتر (أثناء التعديل عليها في الـ Sidebar)
  const [filters, setFilters] = useState({
    rating: null,
    sort: "default",
    price: [0, maxPrice],
    category: "",
  });

  // القيم المطبقة فعلياً على عرض المنتجات (بعد الضغط على تطبيق)
  const [appliedFilters, setAppliedFilters] = useState(filters);
  
  // حالة التحميل لإظهار الـ Skeletons أثناء عملية الفلترة
  const [loading, setLoading] = useState(false);

  /**
   * تطبيق الفلترة مع تأثير تحميل اصطناعي لتحسين تجربة المستخدم
   * @param {function} onApplyCallback - دالة اختيارية يتم استدعاؤها بعد التطبيق (مثل إغلاق القائمة)
   */
  const handleApplyFilters = (onApplyCallback) => {
    if (onApplyCallback) onApplyCallback();
    
    setLoading(true);
    // محاكاة تأخير التحميل لإعطاء شعور بالاستجابة
    setTimeout(() => {
      setAppliedFilters(filters);
      setLoading(false);
    }, 1000);
  };

  /**
   * إعادة تصفير الفلاتر للقيم الافتراضية
   * @param {function} onResetCallback - دالة اختيارية يتم استدعاؤها بعد التصفير
   */
  const handleResetFilters = (onResetCallback) => {
    const reset = {
      rating: null,
      sort: "default",
      price: [0, maxPrice],
      category: "",
    };
    setFilters(reset);
    setAppliedFilters(reset);
    if (onResetCallback) onResetCallback();
  };

  /**
   * حساب قائمة المنتجات المفلترة والمرتبة باستخدام useMemo لتحسين الأداء
   */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. فلترة حسب التقييم
    if (appliedFilters.rating) {
      const min = appliedFilters.rating;
      const max = appliedFilters.rating + 0.9;
      result = result.filter((p) => p.rating >= min && p.rating <= max);
    }

    // 2. فلترة حسب السعر
    result = result.filter(
      (p) => p.price >= appliedFilters.price[0] && p.price <= appliedFilters.price[1]
    );

    // 3. فلترة حسب التصنيف
    if (appliedFilters.category) {
      result = result.filter((p) =>
        p.category.toLowerCase().includes(appliedFilters.category.toLowerCase())
      );
    }

    // 4. الترتيب
    if (appliedFilters.sort === "price_low_high") {
      result.sort((a, b) => a.price - b.price);
    } else if (appliedFilters.sort === "price_high_low") {
      result.sort((a, b) => b.price - a.price);
    } else if (appliedFilters.sort === "rating_high_low") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, appliedFilters]);

  return {
    filters,
    setFilters,
    appliedFilters,
    loading,
    maxPrice,
    handleApplyFilters,
    handleResetFilters,
    filteredProducts,
  };
}
