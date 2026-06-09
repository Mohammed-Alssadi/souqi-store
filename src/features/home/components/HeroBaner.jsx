import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

function HeroBanner() {
  const { i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');
  const [loading, setLoading] = useState(true);
  // 🔹 محاكاة تحميل الصور (تقدر تربطها بتحميل فعلي)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
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
      <div className="flex flex-row items-stretch gap-2 md:gap-4 h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh]">
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
                    fetchpriority={idx === 0 ? "high" : "auto"}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  {/* Text Overlay (No background effects, highly responsive text) */}
                  <div className={`absolute inset-0 flex flex-col justify-center px-4 sm:px-10 md:px-16 w-full h-full ${isAr ? 'text-right' : 'text-left'}`}>
                    <div className="max-w-[95%] sm:max-w-[80%] md:max-w-[70%]">
                      <h2 className={`text-[18px] sm:text-3xl md:text-5xl lg:text-6xl font-black mb-1.5 sm:mb-4 tracking-tight drop-shadow-md leading-tight sm:leading-tight ${item.isDark ? 'text-white' : 'text-zinc-900'}`}>
                        {item.title}
                      </h2>
                      <p className={`hidden sm:block text-sm md:text-lg mb-4 sm:mb-8 font-medium drop-shadow-md leading-relaxed ${item.isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                        {item.desc}
                      </p>
                      <Button className="w-fit rounded-full shadow-md mt-1 sm:mt-2 h-8 px-4 text-xs sm:h-10 sm:px-6 sm:text-sm md:text-base">
                        {item.btn}
                      </Button>
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
                  fetchpriority="high"
                  loading="eager"
                
                />
              </div>
              <div className="flex-1 relative rounded-xl md:rounded-3xl overflow-hidden">
                <img
                  src="/images/offer2.jpg"
                  alt="offer2"
                  className="absolute inset-0 w-full h-full object-cover"
                  fetchpriority="high"
                  loading="eager"
         
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
