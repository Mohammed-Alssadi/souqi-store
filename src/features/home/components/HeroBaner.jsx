import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

function HeroBanner() {
  const { i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');
  const [loading, setLoading] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  // 🔹 محاكاة تحميل الصور (تقدر تربطها بتحميل فعلي)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const bannerImages = [
    "/images/baner.jpg",
    "/images/baner2.jpg",
    "/images/banr3.jpg",
    "/images/banr4.jpg",
    "/images/baner5.jpg",
  ];

  return (
    <div className="mt-4 md:mt-6">
      <div className="flex flex-row items-stretch gap-2 md:gap-4 h-[25vh] sm:h-[35vh] md:h-[50vh] lg:h-[65vh]">
        {/* 🔹 Slider Container (70%) */}
        <div className="w-[70%] rounded-xl md:rounded-3xl relative h-full overflow-hidden">
          {loading ? (
            <div className="w-full h-full bg-secondary dark:bg-zinc-800 animate-pulse" />
          ) : (
            <Swiper
              key={i18n.language}
              dir={isAr ? "rtl" : "ltr"}
              modules={[Autoplay, Pagination, Navigation]}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              speed={600}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-white !opacity-50",
                bulletActiveClass: "!bg-blue-500 !opacity-100",
              }}
              className="h-full w-full"
            >
              {bannerImages.map((img, idx) => (
                <SwiperSlide key={idx} className="h-full">
                  <img
                    src={img}
                    alt={`banner${idx}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* 🔹 Offers (30%) */}
        <div className="w-[30%] flex flex-col gap-2 md:gap-4 h-full">
          {loading ? (
            <>
              <div className="flex-1 w-full rounded-xl md:rounded-3xl bg-secondary dark:bg-zinc-800 animate-pulse" />
              <div className="flex-1 w-full rounded-xl md:rounded-3xl bg-secondary dark:bg-zinc-800 animate-pulse" />
            </>
          ) : (
            <>
              <div className="flex-1 relative rounded-xl md:rounded-3xl overflow-hidden">
                <img
                  src="/images/offer1.jpg"
                  alt="offer1"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 relative rounded-xl md:rounded-3xl overflow-hidden">
                <img
                  src="/images/offer2.jpg"
                  alt="offer2"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
