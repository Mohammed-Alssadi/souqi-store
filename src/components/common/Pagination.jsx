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
 * @param {number} currentPage - الصفحة الحالية (للتحكم المتزامن)
 */
export default function Pagination({ pageCount, onPageChange, currentPage }) {
  const { i18n } = useTranslation();
  const isAr = i18n.language.startsWith("ar");

  // إذا كان هناك صفحة واحدة أو أقل لا داعي لعرض أزرار التصفح
  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-center items-center w-full md:w-auto">
      <ReactPaginate
        // التحكم في اتجاه الأسهم بناءً على لغة الواجهة
        previousLabel={isAr ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        nextLabel={isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        
        pageCount={pageCount}
        onPageChange={onPageChange}
        forcePage={currentPage}
        
        // تنسيقات الحاوية
        containerClassName="flex items-center gap-1 md:gap-2"
        
        // تنسيقات أزرار الصفحات (الحاوية li)
        pageClassName="w-8 h-8 md:w-10 md:h-10 border border-border rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer text-sm font-medium bg-card overflow-hidden"
        pageLinkClassName="w-full h-full flex items-center justify-center" // جعل الرابط يملأ المربع بالكامل
        
        // تنسيقات أزرار السابق والتالي
        previousClassName="w-8 h-8 md:w-10 md:h-10 border border-border rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer bg-card overflow-hidden"
        previousLinkClassName="w-full h-full flex items-center justify-center"
        
        nextClassName="w-8 h-8 md:w-10 md:h-10 border border-border rounded-lg hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer bg-card overflow-hidden"
        nextLinkClassName="w-full h-full flex items-center justify-center"
        
        // تنسيق الصفحة النشطة
        activeClassName="!bg-primary text-primary-foreground !border-primary shadow-sm pointer-events-none"
        
        // عدد الصفحات المعروضة على الأطراف وبجوار الصفحة الحالية
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
      />
    </div>
  );
}
