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
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-center text-2xl md:text-4xl font-semibold text-foreground md:text-start md:pt-8 md:mb-4">
          {t('home.bestSelling', 'Best Selling')}
        </p>
        <Link
          to="/products"
          className="text-muted-foreground hover:text-foreground font-medium text-lg md:pt-6 md:mt-8 py-4 md:me-6 pe-5 flex items-center"
        >
          {t('home.seeAll', 'See All')}
          <ArrowRightFromLine className={`${isAr ? 'me-3 rotate-180' : 'ms-3'} text-2xl text-primary`} />
        </Link>
      </div>

      {/* ⏳ أثناء التحميل */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
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
                1400: { slidesPerView: 5 },
                1200: { slidesPerView: 4 },
                992: { slidesPerView: 3 },
                768: { slidesPerView: 2 },
                0: { slidesPerView: 1 },
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
