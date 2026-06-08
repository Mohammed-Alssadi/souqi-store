import React, { useEffect, useState } from 'react';
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

function ForYouSection() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');
  const products = useProductStore((state) => state.items);
  const [forYou, setForYou] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      setForYou(shuffled.slice(0, 10));

      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [products]);

  return (
    <div className="mt-20">
      {/* العنوان ورابط "See All" */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-center text-2xl md:text-4xl font-semibold text-foreground md:text-start">
          {t('home.forYou', 'Just For You')}
        </h2>
        <Link
          to="/products"
          className="text-muted-foreground hover:text-foreground font-medium text-lg flex items-center"
        >
          {t('home.seeAll', 'See All')}
          <ArrowRightFromLine className={`${isAr ? 'me-3 rotate-180' : 'ms-3'} text-2xl text-primary`} />
        </Link>
      </div>

      {/* حالة التحميل */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : forYou.length > 0 ? (
        <div className="px-2">
          {/* سلايدر Swiper */}
          <Swiper
            key={i18n.language}
            dir={isAr ? "rtl" : "ltr"}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={4}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            grabCursor={true}
            breakpoints={{
              1400: { slidesPerView: 5 },
              1200: { slidesPerView: 4 },
              992: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
            className="pb-2 mb-8 px-4 overflow-hidden"
          >
            {forYou.map((p) => (
              <SwiperSlide key={p.id}>
                <div className="px-1 pb-8 mb-6">
                  <ProductCard product={p} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-6">{t('home.noProducts', 'No products available.')}</p>
      )}
    </div>
  );
}

export default ForYouSection;
