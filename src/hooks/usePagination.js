import { useState, useMemo } from "react";

/**
 * خطاف مخصص لإدارة حالة التصفح (Pagination)
 * 
 * @param {Array} data - مصفوفة البيانات المراد تقسيمها
 * @param {number} itemsPerPage - عدد العناصر في كل صفحة
 * @returns {Object} { currentPage, currentItems, pageCount, handlePageClick, setCurrentPage }
 */
export default function usePagination(data = [], itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(0);

  // حساب المنتجات التي سيتم عرضها في الصفحة الواحدة
  const offset = currentPage * itemsPerPage;

  // تجنب إعادة الحساب إلا إذا تغيرت البيانات أو الصفحة
  const currentItems = useMemo(() => {
    return data.slice(offset, offset + itemsPerPage);
  }, [data, offset, itemsPerPage]);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  // عند تغيير الصفحة من خلال مكون ReactPaginate
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    // يمكن إضافة window.scrollTo({ top: 0, behavior: 'smooth' }) هنا إذا أردنا الصعود لأعلى
  };

  return {
    currentPage,
    setCurrentPage,
    currentItems,
    pageCount,
    handlePageClick,
  };
}
