import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store';
import { useCategoryStore } from '../../categories/store';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import ReactPaginate from "react-paginate";
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ProductByCategory() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');
  const categories = useCategoryStore((state) => state.items);
  const products = useProductStore((state) => state.items);
  const [loading, setLoading] = useState(true);

  //  حاله المنتجات في الصفحه
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;


  useEffect(() => {
    setLoading(true);
    setCurrentPage(0);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);

  }, [])
  const currentCategory = categories.find((category) => category.slug === slug);
  if (!currentCategory) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">404!</h1>
        <p className="text-muted-foreground">Page Not Found.</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }
  const filteredProducts = products.filter((product) => product.category === currentCategory.name_en);

  // حساب المنتجات التي سيتم عرضها ف الصفحه الواحده
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // عند تغيير الصفحة
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };


  return (
    <>
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-8 min-h-[50vh]">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 md:pt-4 text-start">
          {isAr ? currentCategory.name_ar : currentCategory.name_en}
        </h1>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 mt-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <>
            <div className=" flex flex-col justify-center">
              <p className="text-center text-muted-foreground">{t('category.noProducts', 'No products found for')} {isAr ? currentCategory.name_ar : currentCategory.name_en}</p>
              <Link
                to="/#categories"
                className="text-center text-blue-600 hover:text-blue-800 my-4  font-medium"
              >
                &larr; {t('category.backToCategories', 'Back To Categories')}
              </Link>
            </div>
          </>
        ) : (
          <>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
              {!loading && currentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {pageCount > 1 && (
              <div className=" flex justify-center  mt-8 md:mt-12 md:pt-4 pb-8">
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
          </>


        )}
      </div>
    </>
  )
}

export default ProductByCategory