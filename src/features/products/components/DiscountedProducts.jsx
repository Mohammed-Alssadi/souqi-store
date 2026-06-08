import React, { useState, useEffect } from 'react';
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

function DiscountedProducts() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');
  const products = useProductStore((state) => state.items);
  const [loading, setLoading] = useState(true);
  const [discounted, setDiscounted] = useState([]);

  // ⚙️ إعداد البيانات (فرز المنتجات المخفَّضة)
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const filtered = [...products]
        .filter(p => p.oldPrice && p.oldPrice > p.price)
        .sort((a, b) => {
          const pctA = ((a.oldPrice - a.price) / a.oldPrice) * 100;
          const pctB = ((b.oldPrice - b.price) / b.oldPrice) * 100;
          return pctB - pctA;
        })
        .slice(0, 9);

      setDiscounted(filtered);

      // 🕒 محاكاة تحميل 4 ثوانٍ
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [products]);

  return (
    <div className="pt-6 m overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-center text-2xl md:text-4xl font-semibold text-foreground md:text-start mb-1">
          {t('home.discountedProducts', 'Discounted Products')}
        </h2>
        <Link
          to="/products"
          className="text-muted-foreground hover:text-foreground font-medium text-lg flex items-center"
        >
          {t('home.seeAll', 'See All')}
          <ArrowRightFromLine className={`${isAr ? 'me-3 rotate-180' : 'ms-3'} text-2xl text-primary`} />
        </Link>
      </div>

      {loading ? (
        // 🔄 عرض هيكل التحميل أثناء الانتظار
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : discounted.length > 0 ? (
        <Swiper
          key={i18n.language}
          dir={isAr ? "rtl" : "ltr"}
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          grabCursor={true}
          breakpoints={{
            1400: { slidesPerView: 5 },
            1200: { slidesPerView: 4 },
            992: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            575: { slidesPerView: 1 },
            0: { slidesPerView: 1 },
          }}
          className=" mb-8 overflow-hidden "
        >
          {discounted.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="px-1 pb-6 mb-4">
                <ProductCard product={product} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-muted-foreground mt-6">{t('home.noDiscountedProducts', 'No discounted products available.')}</p>
      )}
    </div>
  );
}

export default DiscountedProducts;
