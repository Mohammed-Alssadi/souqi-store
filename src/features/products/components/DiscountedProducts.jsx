import React, { useState, useEffect, useMemo } from 'react';
import { useProductStore } from '../store';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { ArrowRightFromLine } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUpVariant } from '../../../utils/animations';

function DiscountedProducts() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');
  const products = useProductStore((state) => state.items);
  const loading = useProductStore((state) => state.isLoading);

  // ⚙️ إعداد البيانات (فرز المنتجات المخفَّضة) محلياً بدون useEffect (Derived State)
  const discounted = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) return [];
    return [...products]
      .filter(p => p.oldPrice && p.oldPrice > p.price)
      .sort((a, b) => {
        const pctA = ((a.oldPrice - a.price) / a.oldPrice) * 100;
        const pctB = ((b.oldPrice - b.price) / b.oldPrice) * 100;
        return pctB - pctA;
      })
      .slice(0, 9);
  }, [products]);

  return (
    <div className="pt-0 mt-0 m overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUpVariant}
        className="flex md:flex-row justify-between items-center py-2 md:mb-6"
      >
        <h2 className="text-center text-lg md:text-4xl font-semibold text-foreground md:text-start mb-1">
          {t('home.discountedProducts', 'Discounted Products')}
        </h2>
        <Link
          to="/products"
          className="text-muted-foreground hover:text-foreground font-medium text-md md:text-lg py-2 flex items-center"
        >
          {t('home.seeAll', 'See All')}
          <ArrowRightFromLine className={`${isAr ? 'me-3 rotate-180' : 'ms-3'} text-xl text-primary`} />
        </Link>
      </motion.div>

      {loading ? (
        // 🔄 عرض هيكل التحميل أثناء الانتظار
        <div className="flex gap-3 md:gap-6 mt-2 pt-2 mb-8 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-[100%] min-[480px]:w-[48%] sm:w-[38%] md:w-[27%] lg:w-[23%] xl:w-[15%] shrink-0 px-1 pb-6 mb-4">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      ) : discounted.length > 0 ? (
        <div className="mt-2">
          <Swiper
            key={i18n.language}
            dir={isAr ? "rtl" : "ltr"}
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={2}
            slidesPerView={4}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            grabCursor={true}
            breakpoints={{
              1280: { slidesPerView: 6, spaceBetween: 10 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
              768: { slidesPerView: 3.5, spaceBetween: 20 },
              640: { slidesPerView: 2.5, spaceBetween: 15 },
              480: { slidesPerView: 2, spaceBetween: 15 },
              0: { slidesPerView: 1, spaceBetween: 0 },
            }}
            className="pt-2 mb-8 overflow-hidden "
          >
            {discounted.map((product, index) => (
              <SwiperSlide key={product.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-1 pb-6 mb-4"
                >
                  <ProductCard product={product} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-6">{t('home.noDiscountedProducts', 'No discounted products available.')}</p>
      )}
    </div>
  );
}

export default DiscountedProducts;
