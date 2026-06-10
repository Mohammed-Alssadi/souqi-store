import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HeroBanner() {
  const { t, i18n } = useTranslation();
  const isAr = i18n?.language?.startsWith("ar") || false;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // إعطاء السكلتون وقت ليظهر، وللمتصفح وقت ليرتاح قبل الأنيميشن
    return () => clearTimeout(timer);
  }, []);

  const slideData = t("home.heroBanner.slides", { returnObjects: true })?.[0] || {};
  
  // You can replace these with actual image paths later
  const slideImages = [
    "/images/offer1.jpg", 
    "/images/offer2.jpg",
    "/images/banner_fashion.png",
  ];

  if (loading) {
    return (
      <div className="relative  overflow-hidden">
        <div className="flex flex-col md:flex-row items-center h-[70vh] md:h-[80vh] w-full">
          
          {/* Skeleton Text Area */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-6 pt-10 pb-6 md:py-10 md:px-16 lg:px-24 h-auto md:h-full relative z-10">
            <div className="flex flex-col items-start w-full">
              {/* Badge */}
              <Skeleton className="h-8 w-32 rounded-full mb-4 md:mb-6" />
              
              {/* Title */}
              <Skeleton className="h-12 md:h-16 w-3/4 mb-4" />
              <Skeleton className="h-12 md:h-16 w-2/3 mb-6" />
              
              {/* Subtitle */}
              <Skeleton className="h-5 md:h-6 w-full max-w-lg mb-3" />
              <Skeleton className="h-5 md:h-6 w-4/5 max-w-lg mb-6 md:mb-8" />
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-2">
                <Skeleton className="h-12 w-40 rounded-full" />
                <Skeleton className="h-12 w-32 rounded-full" />
              </div>
            </div>
          </div>
          
          {/* Skeleton Image Area */}
          <div className="w-full md:w-1/2 h-[30vh] md:h-[90%] md:p-6 lg:p-10">
            <Skeleton className="w-full h-full rounded-md md:rounded-lg shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative  dark:bg-zinc-900/50  dark:border-zinc-800/50 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center h-full md:h-[80vh] w-full">
        
        {/* Text Content Area (Static) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 pt-10 pb-6 md:py-10 md:px-16 lg:px-24 h-auto md:h-full relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.1 }
              }
            }}
            className="flex flex-col items-start transform-gpu"
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 md:mb-6 shadow-sm backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary me-2 animate-pulse" />
              {slideData.badge}
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.4] md:leading-[1.3] tracking-tight mb-4 md:mb-6">
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }} className="block mb-2 md:mb-4">
                <span className="text-zinc-900 dark:text-zinc-50 drop-shadow-sm">{slideData.title}</span>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }} className="block py-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r rtl:bg-gradient-to-l from-primary to-blue-500">{slideData.subtitle}</span>
              </motion.div>
            </h1>

            <motion.p 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }}
              className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-lg leading-relaxed mb-6 md:mb-8 font-medium"
            >
              {slideData.desc}
            </motion.p>

            <motion.div 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <Button size="lg" className="rounded-full px-6 sm:px-8 py-6 text-sm sm:text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 group transition-all duration-300">
                {slideData.btn1} 
                {isAr ? <ArrowLeft className="ms-2 w-5 h-5 group-hover:-translate-x-1.5 transition-transform" /> : <ArrowRight className="ms-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />}
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6 sm:px-8 py-6 text-sm sm:text-base font-bold border-2 border-zinc-200 dark:border-zinc-800 text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                {slideData.btn2}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Image Area (Slider) */}
        <div className="w-full md:w-1/2 h-[30vh] md:h-[90%]   md:p-6 lg:p-10">
          {/* group class is for showing navigation on hover */}
          <div className="w-full h-full  rounded-md md:rounded-lg overflow-hidden shadow-sm group">
            <Swiper
              key={i18n.language}
              dir={isAr ? "rtl" : "ltr"}
              modules={[Autoplay, Pagination, Navigation, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              speed={1500}
              navigation={{
                prevEl: '.hero-prev',
                nextEl: '.hero-next',
              }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !w-2.5 !h-2.5 !bg-white !opacity-50 transition-all",
                bulletActiveClass: "!bg-primary !opacity-100 !w-8 !rounded-full",
              }}
              className="h-full w-full"
            >
              {slideImages.map((imgSrc, idx) => (
                <SwiperSlide key={idx} className="h-full w-full">
                  <div className=" bg-black/5  pointer-events-none" />
                  <img
                    src={imgSrc}
                    alt="Hero Slide"
                    className="w-full h-full object-cover object-center"
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                </SwiperSlide>
              ))}
              
              {/* Custom Navigation Arrows */}
              <div className={`hero-prev absolute top-1/2 -translate-y-1/2 ${isAr ? 'right-4' : 'left-4'} z-20 w-10 h-10 flex items-center justify-center bg-primary/10 hover:bg-primary backdrop-blur-md shadow-md rounded-full text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100`}>
                {isAr ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
              </div>
              <div className={`hero-next absolute top-1/2 -translate-y-1/2 ${isAr ? 'left-4' : 'right-4'} z-20 w-10 h-10 flex items-center justify-center bg-primary/10 hover:bg-primary backdrop-blur-md shadow-md rounded-full text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100`}>
                {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </div>
            </Swiper>
          </div>
        </div>

      </div>
    </div>
  );
}
