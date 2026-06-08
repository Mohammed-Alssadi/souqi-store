import React from "react";
import { Link } from "react-router-dom";
import { Star, Lock, ShoppingCart, Eye, Plus } from "lucide-react";
import { useCartStore } from "../../cart/store";
import DiscountBadge from "../../../components/ui/DiscountBadge";
import { useTranslation } from "react-i18next";

function ProductCard({ product }) {
  const { t, i18n } = useTranslation();
  const { id, image, price, oldPrice, sold, rating } = product;
  const title = i18n.language.startsWith('ar') ? product.title_ar : product.title_en;
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="group border border-border rounded-xl shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 bg-card text-card-foreground relative flex flex-col h-full overflow-hidden">
      
      {/* الجزء القابل للنقر (الصورة والعنوان) */}
      <Link to={`/product/${id}`} className="flex flex-col flex-grow">
        {/* صورة المنتج */}
        <div className="relative bg-white dark:bg-white rounded-t-xl overflow-hidden flex justify-center items-center h-28 sm:h-32 md:h-52 w-full">
          <div 
            className="absolute top-0 start-0 z-10"
          >
             <DiscountBadge oldPrice={oldPrice} price={price} />
          </div>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain p-1.5 md:p-3 transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* العنوان والتقييم */}
        <div className="px-1.5 md:px-4 pt-1 md:pt-3">
          <h2 className="text-[11px] md:text-lg font-medium text-card-foreground truncate leading-tight md:leading-normal">
            {title}
          </h2>
          <div className="flex items-center text-[9px] md:text-sm text-muted-foreground mt-0 md:mt-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />
              <span>{rating} <span className="hidden md:inline">(0)</span></span>
            </div>
            <span className="mx-1 hidden md:inline">•</span>
            <span className="hidden md:inline">{sold} {t('product.sold', 'Sold')}</span>
            <span className="md:hidden ms-auto text-muted-foreground/80">{sold} {t('product.sold', 'Sold')}</span>
          </div>
        </div>
      </Link>

      {/* تفاصيل السعر والأزرار */}
      <div className="px-1.5 md:px-4 pb-1.5 md:pb-4 pt-0 flex flex-col justify-end">
          {/* السعر للموبايل */}
          <div className="flex md:hidden flex-col mt-0.5">
             <p className="text-[13px] font-bold text-red-600 leading-none">
               ${price.toFixed(2)}
             </p>
             {oldPrice && (
               <p className="text-[9px] text-muted-foreground line-through mt-0.5 leading-none">${oldPrice}</p>
             )}
          </div>

          {/* السعر للشاشات الكبيرة */}
          <div className="hidden md:flex mt-2 items-center gap-3">
            <p className="text-lg font-bold text-red-600">
              ${price.toFixed(2)}
            </p>
            {oldPrice && (
              <p className="text-sm text-muted-foreground line-through">${oldPrice}</p>
            )}
          </div>

        {/* أزرار الشراء (للشاشات الصغيرة والكبيرة) */}
        <div className="flex justify-between items-stretch gap-1 md:gap-2 mt-1.5 md:mt-4">
          <button 
            onClick={() => addToCart(product)}
            className="flex-1 border border-border rounded md:rounded-lg py-1 md:py-2 text-primary hover:bg-accent hover:text-accent-foreground flex justify-center items-center transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5 md:w-5 md:h-5" />
          </button>
            
          <Link 
            to={`/product/${id}`}
            className="flex-1 border border-border hover:border-primary/50 rounded md:rounded-lg py-1 md:py-2 text-primary hover:bg-accent hover:text-accent-foreground flex justify-center items-center transition-all"
          >
            <Eye className="w-3.5 h-3.5 md:w-5 md:h-5" />
          </Link>
          
          <button className="flex-[2] border border-primary text-primary rounded md:rounded-lg py-1 md:py-2 flex items-center justify-center gap-1 hover:bg-primary/10 transition-all text-[10px] md:text-sm font-bold">
            <Lock className="w-3 h-3 md:w-4 md:h-4 hidden md:block" />
            <span className="md:hidden truncate">{t('product.buy', 'Buy')}</span>
            <span className="hidden md:inline">{t('product.buyNow', 'Buy Now')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
