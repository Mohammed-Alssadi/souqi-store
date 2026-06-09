import React from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * مكون واجهة للتصفح (Pagination)
 * يغلف مكتبة react-paginate مع تنسيقات جاهزة ويدعم اللغتين العربية والإنجليزية.
 * 
 * @param {number} pageCount - إجمالي عدد الصفحات
 * @param {function} onPageChange - دالة يتم استدعاؤها عند تغيير الصفحة
 */
export default function Pagination({ pageCount, onPageChange }) {
  const { i18n } = useTranslation();
  const isAr = i18n.language.startsWith("ar");

  // إذا كان هناك صفحة واحدة أو أقل لا داعي لعرض أزرار التصفح
  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-4 md:mt-12 md:pt-4 pb-8 w-full md:w-auto">
      <ReactPaginate
        // التحكم في اتجاه الأسهم بناءً على لغة الواجهة
        previousLabel={isAr ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        nextLabel={isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        
        pageCount={pageCount}
        onPageChange={onPageChange}
        
        // تنسيقات الحاوية
        containerClassName="flex items-center gap-1 md:gap-2"
        
        // تنسيقات أزرار الصفحات
        pageClassName="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-border rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer text-sm font-medium bg-card"
        
        // تنسيقات أزرار السابق والتالي
        previousClassName="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-border rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer bg-card"
        nextClassName="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-border rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer bg-card"
        
        // تنسيق الصفحة النشطة
        activeClassName="!bg-primary text-primary-foreground !border-primary shadow-sm pointer-events-none"
        
        // عدد الصفحات المعروضة على الأطراف وبجوار الصفحة الحالية
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
      />
    </div>
  );
}
