import React, { useEffect, useState } from "react";
import { useProductStore } from "../store";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Link } from "react-router-dom";
import { ArrowRightFromLine } from "lucide-react";
import '../../../index.css';
import { useTranslation } from "react-i18next";

function BestSelling() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');
  const products = useProductStore((state) => state.items);
  const [bestSelling, setBestSelling] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 فرز المنتجات حسب الأكثر مبيعاً
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const sorted = [...products]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10);
      setBestSelling(sorted);

      // ⏳ محاكاة التحميل
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [products]);

  return (
    <div className="mt-1">
      {/* 🔹 العنوان والرابط */}
      <div className="flex  md:flex-row justify-between items-center py-2 md:mb-6">
        <p className="text-center text-xl md:text-4xl font-semibold text-foreground md:text-start">
          {t('home.bestSelling', 'Best Selling')}
        </p>
        <Link
          to="/products"
          className="text-muted-foreground hover:text-foreground font-medium text-md md:text-xl flex items-center"
        >
          {t('home.seeAll', 'See All')}
          <ArrowRightFromLine className={`${isAr ? 'me-3 rotate-180' : 'ms-3'} text-lg text-primary`} />
        </Link>
      </div>

      {/* ⏳ أثناء التحميل */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        bestSelling.length > 0 && (
          <div className=" px-2">
            {/* 🌀 سلايدر Swiper */}
            <Swiper
              key={i18n.language}
              dir={isAr ? "rtl" : "ltr"}
              modules={[Navigation, Autoplay, Pagination]} // تفعيل الأسهم والتشغيل التلقائي
              spaceBetween={20} // المسافة بين البطاقات
              slidesPerView={4}
               // عدد البطاقات الافتراضي على الشاشات الكبيرة
            
              pagination={{ clickable: true }}
               // عرض الأسهم
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true} // يجعل السلايدر دائري
              grabCursor={true} // يجعل المؤشر بشكل اليد عند السحب
              breakpoints={{
                1280: { slidesPerView: 5, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
                768: { slidesPerView: 3.5, spaceBetween: 20 },
                640: { slidesPerView: 2.5, spaceBetween: 15 },
                480: { slidesPerView: 2, spaceBetween: 15 },
                0: { slidesPerView: 1, spaceBetween: 0 },
              }}
              className="pb-2 mb-8 p overflow-hidden"
            >
              {/* 🧱 بطاقات المنتجات */}
              {bestSelling.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="px-1 mb-12 mx-">
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )
      )}
    </div>
  );
}

export default BestSelling;
