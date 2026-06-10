import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useCategoryStore } from '../store';
import CategoryCard from './CategoryCard';
import CategoryCardSkeleton from './CategoryCardSkeleton';
import { Button } from '@/components/ui/button';
import { ArrowRightFromLine } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { motion } from 'framer-motion';
import { fadeUpVariant } from '../../../utils/animations';

function TopCategories() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');
  const categories = useCategoryStore((state) => state.items);
  const loading = useCategoryStore((state) => state.isLoading);

  return (
    <div className="mt-2 mx-0">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUpVariant}
        className="flex md:flex-row justify-between items-center md:mb-6 pb-4 md:pb-0"
      >
        <p className="text-center text-lg md:text-4xl font-semibold text-foreground md:text-start">
          {t('home.topCategories', 'Top Categories')}
        </p>
        <Button variant="link" className="text-muted-foreground hover:text-foreground font-medium text-md md:text-lg px-0" asChild>
          <Link to="/categories" className="flex items-center gap-2">
            {t('home.seeAll', 'See All')}
            <ArrowRightFromLine className={`${isAr ? 'rotate-180' : ''} text-primary`} size={20} />
          </Link>
        </Button>
      </motion.div>

      {loading ? (
        <div className="flex gap-3 md:gap-4 mt-2 pb-2 mb-8 px-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-[100%] min-[480px]:w-[40%] sm:w-[25%] md:w-[22%] lg:w-[20%] xl:w-[16%] shrink-0 px-1 pb-8 mb-4">
              <CategoryCardSkeleton />
            </div>
          ))}
        </div>
      ) : categories.length > 0 ? (
        <div className="mt-2">
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
              380: { slidesPerView: 1, spaceBetween: 0 },
              0: { slidesPerView: 1, spaceBetween: 0 },
            }}
            className="pb-2 mb-8 px-4 overflow-hidden"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={category.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-1 pb-8 mb-4"
                >
                  <CategoryCard category={category} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-6">{t('home.noCategories', 'No categories available.')}</p>
      )}
    </div>
  );
}

export default TopCategories;
