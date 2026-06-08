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

  const bannerImagesEn = [
    { 
      img: "/images/banner_tech.png", 
      title: "Latest Technology", 
      desc: "Discover the best electronics with unbeatable prices. Everything you need in one place.", 
      btn: "Shop Tech", 
      isDark: false 
    },
    { 
      img: "/images/banner_fashion.png", 
      title: "Premium Lifestyle", 
      desc: "Elevate your style with our exclusive fashion collection and luxury accessories.", 
      btn: "Shop Fashion", 
      isDark: false 
    }
  ];

  const bannerImagesAr = [
    { 
      img: "/images/banner_tech.png", 
      title: "أحدث التقنيات", 
      desc: "اكتشف أفضل الإلكترونيات بأسعار لا تقبل المنافسة. كل ما تحتاجه في مكان واحد.", 
      btn: "تسوق التقنية", 
      isDark: false 
    },
    { 
      img: "/images/banner_fashion.png", 
      title: "أسلوب حياة راقي", 
      desc: "ارتقِ بأسلوبك مع تشكيلتنا الحصرية من الأزياء والكماليات الفاخرة.", 
      btn: "تسوق الأزياء", 
      isDark: false 
    }
  ];

  const currentBanners = isAr ? bannerImagesAr : bannerImagesEn;

  return (
    <div className="mt-4 md:mt-6">
      <div className="flex flex-row items-stretch gap-2 md:gap-4 h-[25vh] sm:h-[35vh] md:h-[50vh] lg:h-[65vh]">
        {/* 🔹 Slider Container (70%) */}
        <div className="w-[70%] rounded-xl md:rounded-3xl relative h-full overflow-hidden shadow-sm">
          {loading ? (
            <div className="w-full h-full bg-secondary dark:bg-zinc-800 animate-pulse" />
          ) : (
            <Swiper
              key={i18n.language}
              dir={isAr ? "rtl" : "ltr"}
              modules={[Autoplay, Pagination, Navigation]}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              speed={800}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-white !opacity-50",
                bulletActiveClass: "!bg-blue-500 !opacity-100",
              }}
              className="h-full w-full"
            >
              {currentBanners.map((item, idx) => (
                <SwiperSlide key={idx} className="h-full relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Text Overlay (No background effects, highly responsive text) */}
                  <div className={`absolute inset-0 flex flex-col justify-center px-3 sm:px-10 md:px-16 w-full h-full ${isAr ? 'text-right' : 'text-left'}`}>
                    <div className="max-w-[90%] sm:max-w-[70%]">
                      <h2 className={`text-[16px] leading-tight sm:text-3xl md:text-5xl lg:text-6xl font-black mb-1.5 sm:mb-4 tracking-tight drop-shadow-md ${item.isDark ? 'text-white' : 'text-zinc-900'}`}>
                        {item.title}
                      </h2>
                      <p className={`hidden sm:block text-xs md:text-lg mb-4 sm:mb-8 font-medium drop-shadow-md leading-relaxed ${item.isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                        {item.desc}
                      </p>
                      <button className="w-fit bg-primary text-primary-foreground font-bold text-[10px] sm:text-base px-4 sm:px-8 py-1.5 sm:py-3 rounded-full hover:bg-primary/90 shadow-md">
                        {item.btn}
                      </button>
                    </div>
                  </div>
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
