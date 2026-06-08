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
    <div className="mt-6">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* 🔹 Slider Container */}
        <div className="w-[100%] md:w-[70%] rounded-lg mt-4 relative">
          {loading ? (
            <div className="w-full h-[30vh] md:h-[60vh] rounded-[16px] md:rounded-3xl bg-secondary dark:bg-zinc-800 animate-pulse" />
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
              
              className="rounded-lg md:rounded-3xl"
            >
              {bannerImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`banner${idx}`}
                    className="w-full h-[25vh] md:h-[100%] lg:h-[63vh] object-cover rounded-lg md:rounded-3xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* 🔹 Offers */}
        <div className="w-[100%] md:w-[30%] flex flex-col gap-3">
          {loading ? (
            <>
              <div className="w-full h-[22vh] md:h-[30vh] rounded-xl md:rounded-[30px] bg-secondary dark:bg-zinc-800 animate-pulse" />
              <div className="w-full h-[22vh] md:h-[30vh] rounded-xl md:rounded-[30px] bg-secondary dark:bg-zinc-800 animate-pulse" />
            </>
          ) : (
            <>
              <div className="h-[30%] rounded-lg w-[100%]">
                <img
                  src="/images/offer1.jpg"
                  alt="offer1"
                  className="h-[22vh] md:h-full w-[99%] rounded-xl object-cover"
                />
              </div>
              <div className="h-[30%] lg:h-[50%] rounded-lg">
                <img
                  src="/images/offer2.jpg"
                  alt="offer2"
                  className="h-[22vh] md:h-full w-[99%] rounded-xl object-cover"
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
