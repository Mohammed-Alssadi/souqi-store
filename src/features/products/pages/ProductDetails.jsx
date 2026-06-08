import { BugPlay, CreditCard, ShoppingCart, Star } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductStore } from "../store";
import { useCartStore } from "../../cart/store";
import { Galleria } from "primereact/galleria";
import { useTranslation } from "react-i18next";

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

  const [images] = useState(
    product
      ? [
        { itemImageSrc: product.image, thumbnailImageSrc: product.image, alt: localizedTitle },
        { itemImageSrc: product.image, thumbnailImageSrc: product.image, alt: localizedTitle },
        { itemImageSrc: product.image, thumbnailImageSrc: product.image, alt: localizedTitle },
      ]
      : []
  );

  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 2 },
    { breakpoint: "768px", numVisible: 2 },
    { breakpoint: "560px", numVisible: 2 },
  ];

  const itemTemplate = (item) => (
    <div className=" rounded-2xl p bg-card border border-border">
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        className=" h-[400px] object-contain transition-transform duration-1000 ease-in-out transform hover:scale-150 cursor-zoom-in"
      />
    </div>
  );

  const thumbnailTemplate = (item) => (
    <div className="overflow-hidden rounded-xl  p-4">
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        className=" w-[100px] h-[100px]  my-1 pt-0 object-contain transition-transform duration-300 hover:scale-110 cursor-pointer"
      />
    </div>
  );

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-foreground">
          {t('product.notFound', 'Product Not Found!')}
        </h2>
        <Link
          to="/"
          className="text-primary hover:text-primary/80 font-medium underline"
        >
          {t('product.returnToHome', 'Return to Home')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-5 min-h-[80vh]">
      <Link
        to="/#products"
        className="text-primary hover:text-primary/80 inline-block font-medium mb-6"
      >
        &larr; {t('product.backToProducts', 'Back To Products')}
      </Link>

      {/* الشبكة الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-[-2rem] lg:gap-8">
        {/* العمود الأول: الصور */}
        <div className="flex flex-col items-center  rounded px-5  pb-0  lg:pb-12 overflow-hidden border-b">
          <Galleria
            value={images}
            responsiveOptions={responsiveOptions}
            numVisible={2}
            showIndicators={false}
            showItemNavigators={false}
            circular
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
            style={{ maxWidth: "400px" }}
          />
        </div>

        {/* العمود الثاني: التفاصيل */}
        <div className="flex flex-col justify-center items-start text-start md:justify-around mt-4 md:mt-3 md:pt-3">
          <div>
            <h1 className=" lg:text-3xl text-xl md:text-4xl font-bold text-foreground mb-4">
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
            <button
              onClick={() => addToCart(product)}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-[15px] px-6 py-3 font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200 shadow-lg"
            >
              <ShoppingCart size={22} />
              {t('product.addToCart', 'Add to Cart')}
            </button>
            <button
              onClick={() => addToCart(product)}
              className="flex-1 flex items-center justify-center border border-primary gap-2 text-primary rounded-[17px] px-7 py-3 font-semibold hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-200"
            >
              <CreditCard size={22} />
              {t('product.buyNow', 'Buy Now')}
            </button>
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
