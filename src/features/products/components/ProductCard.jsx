import React from "react";
import { Link } from "react-router-dom";
import { Star, Lock, ShoppingCart, Eye, Plus } from "lucide-react";
import { useCartStore } from "../../cart/store";
import DiscountBadge from "../../../components/common/DiscountBadge";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function ProductCard({ product }) {
  const { t, i18n } = useTranslation();
  const { id, image, price, oldPrice, sold, rating } = product;
  const title = i18n.language.startsWith('ar') ? product.title_ar : product.title_en;
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card className="group border-border rounded-xl shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y- transition-all duration-500 relative flex flex-col h-full overflow-hidden p-0 bg-card">
      
      {/* الجزء القابل للنقر (الصورة والعنوان) */}
      <Link to={`/product/${id}`} className="flex flex-col flex-grow">
        {/* صورة المنتج */}
        <div className="relative bg-white dark:bg-white rounded-t-xl overflow-hidden flex justify-center items-center h-48 lg:h-52 w-full">
          <div 
            className="absolute top-0 start-0 z-10"
          >
             <DiscountBadge oldPrice={oldPrice} price={price} />
          </div>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-110 "
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* العنوان والتقييم */}
        <CardContent className="px-4 pt-4 flex-grow pb-0 flex flex-col">
          <h2 className="text-base lg:text-lg font-medium text-card-foreground line-clamp-2 min-h-[3rem] leading-tight group-hover:text-primary transition-colors duration-300">
            {title}
          </h2>
          <div className="flex items-center text-sm text-muted-foreground mt-2.5">
            <div className="flex items-center gap-0.5">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium text-foreground">{rating} <span className="inline font-normal text-muted-foreground">(0)</span></span>
            </div>
            <span className="mx-1.5 inline text-border">•</span>
            <span className="inline">{sold} {t('product.sold', 'Sold')}</span>
          </div>
        </CardContent>
      </Link>

      {/* تفاصيل السعر والأزرار */}
      <div className="px-4 pb-4 pt-2 flex flex-col justify-end overflow-hidden relative">
          {/* السعر الموحد */}
          <div className="flex mt-1 items-center gap-2 mb-2">
            <p className="text-xl font-bold text-red-600">
              ${price.toFixed(2)}
            </p>
            {oldPrice && (
              <p className="text-sm text-muted-foreground line-through">${oldPrice}</p>
            )}
          </div>

        {/* أزرار الشراء */}
        <div className="flex justify-between items-stretch gap-2 mt-3">
          <Button 
            variant="outline"
            size="icon"
            onClick={(e) => { 
              e.preventDefault(); 
              addToCart(product);
              toast.success(t('cart.addedSuccess', 'Added to cart successfully!'));
            }}
            className="flex-1 h-10 text-primary border-border hover:border-primary hover:bg-primary/5 hover:text-primary px-0 rounded-lg shadow-sm"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
            
          <Button 
            variant="outline"
            size="icon"
            asChild
            className="flex-1 h-10 text-primary border-border hover:border-primary hover:bg-primary/5 hover:text-primary px-0 rounded-lg shadow-sm"
          >
            <Link to={`/product/${id}`}>
              <Eye className="w-5 h-5" />
            </Link>
          </Button>
          
          <Button 
            className="flex-[2] h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Lock className="w-4 h-4 me-1.5" />
            <span>{t('product.buyNow', 'Buy Now')}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
