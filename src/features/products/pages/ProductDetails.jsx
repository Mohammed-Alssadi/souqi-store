import { BugPlay, CreditCard, ShoppingCart, Star } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductStore } from "../store";
import { useCartStore } from "../../cart/store";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

function ProductDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const addToCart = useCartStore((state) => state.addToCart);
  const product = useProductStore((state) =>
    state.items.find((p) => p.id === parseInt(id))
  );

  const isAr = i18n.language.startsWith('ar');
  const localizedTitle = product ? (isAr ? product.title_ar : product.title_en) : '';
  const localizedDescription = product ? (isAr ? product.description_ar : product.description_en) : '';
  const localizedAbout = product ? (isAr ? product.about_ar : product.about_en) : '';

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [images] = useState(
    product
      ? [
        { itemImageSrc: product.image, thumbnailImageSrc: product.image, alt: localizedTitle },
        { itemImageSrc: product.image, thumbnailImageSrc: product.image, alt: localizedTitle },
        { itemImageSrc: product.image, thumbnailImageSrc: product.image, alt: localizedTitle },
      ]
      : []
  );


    if (!product) {
      return (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-semibold mb-4 text-destructive">
            {t('product.notFound', 'Product Not Found!')}
          </h2>
          <Button asChild>
            <Link to="/">
              {t('product.returnToHome', 'Return to Home')}
            </Link>
          </Button>
        </div>
      );
    }

  return (
    <div className="container mx-auto px-2 md:px-6 py-3 md:py-5 min-h-[80vh]">
      <Button variant="link" className="text-primary hover:text-primary/80 font-medium mb-4 md:mb-6 px-0" asChild>
        <Link to="/#products" className="flex items-center gap-1">
          <span className={isAr ? "rotate-180 inline-block" : "inline-block"}>&larr;</span> {t('product.backToProducts', 'Back To Products')}
        </Link>
      </Button>

      {/* الشبكة الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
        {/* العمود الأول: الصور */}
        <div dir="ltr" className="flex flex-col items-center rounded px-2 md:px-5 pb-0 lg:pb-12 overflow-hidden border-b md:border-b-0 w-full max-w-md mx-auto">
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full h-[300px] md:h-[400px] rounded-2xl bg-card border border-border flex justify-center items-center mb-4"
          >
            {images.map((item, idx) => (
              <SwiperSlide key={idx} className="flex justify-center items-center p-4 bg-white dark:bg-white rounded-xl">
                <img src={item.itemImageSrc} alt={item.alt} className="w-full h-full object-contain cursor-zoom-in transition-transform duration-500 hover:scale-110" loading="lazy" decoding="async" />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {images.length > 1 && (
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="w-full h-24"
            >
              {images.map((item, idx) => (
                <SwiperSlide key={idx} className="cursor-pointer overflow-hidden rounded-xl border border-transparent opacity-50 hover:opacity-100 transition-opacity bg-white dark:bg-white [&.swiper-slide-thumb-active]:border-primary [&.swiper-slide-thumb-active]:opacity-100">
                  <img src={item.thumbnailImageSrc} alt={item.alt} className="w-full h-full object-contain p-2" loading="lazy" decoding="async" />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* العمود الثاني: التفاصيل */}
        <div className="flex flex-col justify-center items-start text-start md:justify-around mt-4 md:mt-0 px-2">
          <div className="w-full">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {localizedTitle}
            </h1>

            {/* التقييم */}
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < Math.floor(product.rating || 0) ? "#f472b6" : "none"}
                  className={i < Math.floor(product.rating || 0) ? "text-primary" : "text-muted"}
                />
              ))}
              <span className="text-muted-foreground text-sm ms-2">
                ({product.rating || 0})
              </span>
            </div>

            {/* السعر */}
            <div className="mb-5 ">
              {product.oldPrice && product.oldPrice > product.price ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">
                    ${product.price}
                  </span>
                  <span className="text-muted-foreground line-through text-lg">
                    ${product.oldPrice}
                  </span>
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-primary">
                  ${product.price}
                </span>
              )}
            </div>

            {/* الوصف */}
            <p className="text-muted-foreground leading-relaxed mb-6">
              {localizedDescription}
            </p>

            {/* التصنيف والمبيعات */}
            <div className="grid grid-cols-2 md:grid-cols-3 md:gap-10 gap-5 mb-6 w-full">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {t('product.category', 'Category')}
                </h3>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 mt-1 text-sm font-medium">
                  {product.category}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {t('product.sold', 'Sold')}
                </h3>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 mt-1 text-sm font-medium">
                  {product.sold} units
                </span>
                
              </div>

                <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {t('product.available', 'Available')}
                </h3>
                <span className="inline-block bg-green-500/10 text-green-500 rounded-full px-3 py-1 mt-1 text-sm font-medium">
                  {product.quntity>0?t('product.isAvailable', 'Available'):t('product.notAvailable', 'Not Available')} 
                </span>
                
              </div>
                 <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {t('product.size', 'Size')}
                </h3>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 mt-1 text-sm font-medium">
                  {product.size} 
                </span>
                
              </div>
                 <div className="">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {t('product.color', 'Color')}
                </h3>
                <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 mt-1 text-sm font-medium">
                  {product.color[0]}  | {product.color[1]} | {product.color[2]} 
                </span>
                
              </div>

            </div>
          </div>

          {/* زر الإضافة للسلة */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-5 w-full mt-4">
            <Button
              onClick={() => addToCart(product)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl px-6 py-6 font-semibold shadow-lg"
            >
              <ShoppingCart size={22} />
              {t('product.addToCart', 'Add to Cart')}
            </Button>
            <Button
              variant="outline"
              onClick={() => addToCart(product)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border-primary text-primary hover:bg-primary/10 px-7 py-6 font-semibold"
            >
              <CreditCard size={22} />
              {t('product.buyNow', 'Buy Now')}
            </Button>
          </div>

        </div>
{/* 
   عن المنتج */}

    
      </div>
        <div className="container  mx-auto  border-t">
          <div className="    text-foreground leading-relaxed  p-6">
          <h2 className=" text-xl lg:text-2xl font-bold text-primary mb-4 ">
            {t('product.about', 'About This Product')}
          </h2>
          <p>
            {localizedAbout}
          </p>
         
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
