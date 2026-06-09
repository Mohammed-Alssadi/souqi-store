import React, { useEffect, useState } from 'react';
import { useCategoryStore } from '../../categories/store';
import CategoryCard from './CategoryCard';
import CategoryCardSkeleton from './CategoryCardSkeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { ArrowRightFromLine } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

function TopCategories() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');
  const categories = useCategoryStore((state) => state.items).slice(0, 7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      ) : categories.length > 0 ? (
        <div className="mt-2 mx-0">
          <div className="flex  md:flex-row justify-between items-center md:mb-6 pb-4 md:pb-0">
            <p className="text-center text-lg md:text-4xl font-semibold text-foreground md:text-start">
              {t('home.topCategories', 'Top Categories')}
            </p>
            <Button variant="link" className="text-muted-foreground hover:text-foreground font-medium text-md md:text-lg px-0" asChild>
              <Link to="/categories" className="flex items-center gap-2">
                {t('home.seeAll', 'See All')}
                <ArrowRightFromLine className={`${isAr ? 'rotate-180' : ''} text-primary`} size={20} />
              </Link>
            </Button>
          </div>

          <Swiper
            key={i18n.language}
            dir={isAr ? "rtl" : "ltr"}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={6}
          
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            grabCursor={true}
            breakpoints={{
              1280: { slidesPerView: 6, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
              768: { slidesPerView: 4.5, spaceBetween: 20 },
              640: { slidesPerView: 4, spaceBetween: 15 },
              480: { slidesPerView: 2.5, spaceBetween: 15 },
              380: { slidesPerView: 1.5, spaceBetween: 12 },
              0: { slidesPerView: 1, spaceBetween: 0 },
            }}
            className="pb-2 mb-8 px-4 overflow-hidden"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <div className="px-1 pb-8 mb-4">
                  <CategoryCard category={category} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-6">{t('home.noCategories', 'No categories available.')}</p>
      )}
    </>
  );
}

export default TopCategories;
