// AllProducts.jsx
import React, { useState, useMemo } from "react";
import { useProductStore } from "../store";
import { useCategoryStore } from "../../categories/store";
import ProductCard from "../components/ProductCard";
import { Filter } from "lucide-react";
import SlidbarFilter from "../components/SlidbarFilter";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "@mui/material";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { useTranslation } from "react-i18next";

function AllProducts() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');
  const products = useProductStore((state) => state.items);
  const categories = useCategoryStore((state) => state.items);
  //  حاله المنتجات في الصفحه
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  // الحد الأقصى للسعر حسب جميع المنتجات
  const maxPrice = Math.max(...products.map(p => p.price), 1000);

  // التحكم في Sidebar
  const [visible, setVisible] = useState(false);

  // القيم الحالية
  const [filters, setFilters] = useState({
    rating: null,
    sort: "default",
    price: [0, maxPrice],
    category: "",
  });


  // القيم المطبقة بعد الضغط على Apply
  const [appliedFilters, setAppliedFilters] = useState(filters);

  // حالة التحميل
  const [loading, setLoading] = useState(false);

  // تطبيق الفلترة مع تأخير 5 ثواني
  const handleApplyFilters = () => {
    setVisible(false);
    setLoading(true);
    setCurrentPage(0);
    setTimeout(() => {
      setAppliedFilters(filters);
      setLoading(false);
    }, 1000);

  };

  // إعادة التصفير
  const handleResetFilters = () => {
    const reset = {
      rating: null,
      sort: "default",
      price: [0, maxPrice],
      category: "",
    };
    setFilters(reset);
    setAppliedFilters(reset);
    setCurrentPage(0);
  };

  // فلترة المنتجات
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // فلترة حسب التقييم
    if (appliedFilters.rating) {
      const min = appliedFilters.rating;
      const max = appliedFilters.rating + 0.9;
      result = result.filter(
        (p) => p.rating >= min && p.rating <= max
      );

    }
    // فلترة حسب السعر
    result = result.filter(
      (p) => p.price >= appliedFilters.price[0] && p.price <= appliedFilters.price[1]
    );

    // فلترة حسب التصنيف
    if (appliedFilters.category) {
      result = result.filter((p) =>
        p.category.toLowerCase().includes(appliedFilters.category.toLowerCase())
      );
    }

    // الترتيب
    if (appliedFilters.sort === "price_low_high") {
      result.sort((a, b) => a.price - b.price);
    } else if (appliedFilters.sort === "price_high_low") {
      result.sort((a, b) => b.price - a.price);
    } else if (appliedFilters.sort === "rating_high_low") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, appliedFilters]);

  // حساب المنتجات التي سيتم عرضها ف الصفحه الواحده
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // عند تغيير الصفحة
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };


  return (
    <div className="container  px-1 min-h-[60vh]">
      {/* العنوان وأيقونة الفلترة */}
      <div className="flex justify-between items-center py- md:py-4 px- md:px-5 rounded-lg bg-card ">
        <h1 className=" text-lg md:text-3xl font-semibold"> {t('products.title', 'Products')}</h1>
        <p className="flex items-center  text-md  md:text-lg rounded-xl px-1 md:px-3  cursor-pointer"
          onClick={() => setVisible(true)}>
          {t('products.filter', 'filter')}
          <Filter
            size={isSmallScreen ? 35 : 45}

            className="text-primary py-2 px-1 rounded-lg  hover:text-primary/80 transition"
          />
        </p>
      </div>

      {/* Sidebar الفلترة */}
      <SlidbarFilter
        visible={visible}
        setVisible={setVisible}
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        maxPrice={maxPrice}
        categories={categories}
      />

    

      {filteredProducts.length === 0 && (
        <div className="flex justify-center items-center py-5">
          <p className="text-muted-foreground">{t('products.noProductsFound', 'No products found')}</p>
        </div>
      )}

      {/* حالة التحميل */}
      {filteredProducts.length > 0 && loading && (
        <div className="">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mt-6">{
            Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index}></ProductCardSkeleton>
            ))
          }
          </div>


        </div>
      )}

      {/* المنتجات */}
      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
          {filteredProducts.length > 0 ? (
            currentItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (null)}

        </div>
      )}
<div className=" flex  justify-between items-center">


<p className="text-muted-foreground text-sm md:text-base  mt-8 md:mt-12 md:pt-12 hidden md:inline-block">
  {t('products.showing', 'Showing {{count}} of {{total}} products', { count: currentItems.length, total: products.length })}
</p>
      <div className=" flex justify-center items-center mt-4 md:mt-12 md:pt-4 pb-8 w-full md:w-auto">
        {pageCount > 1 && (
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
        )}
      </div>
    </div>
    </div>
  );
}

export default AllProducts;
