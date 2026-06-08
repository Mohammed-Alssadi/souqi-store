import React from "react";
import { Link } from "react-router-dom";
import { Star, Lock, ShoppingCart } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../../cart/store";
import { Eye } from "lucide-react";
import DiscountBadge from "../../../components/ui/DiscountBadge";
import { useTranslation } from "react-i18next";

function ProductCard({ product }) {
  const { t, i18n } = useTranslation();
  const { id, image, price, oldPrice, sold, rating } = product;
  const title = i18n.language.startsWith('ar') ? product.title_ar : product.title_en;
  const addToCart = useCartStore((state) => state.addToCart);
  // const product = useSelector((state) =>
  //   state.product.items.find((p) => p.id === parseInt(id))
  // );
  return (
    <div className="border border-border rounded-xl shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 bg-card text-card-foreground relative">
      {/* صورة المنتج */}
     
      <div className="relative bg-white dark:bg-white rounded-t-xl overflow-hidden flex justify-center items-center">
        <DiscountBadge oldPrice={oldPrice} price={price} />
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-contain p-3 transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* تفاصيل المنتج */}
      <div className="px-4 pb-2 pt-0">
        <h2 className="text-lg font-medium text-card-foreground truncate ">
          {title}
        </h2>

        <div className="mt-2 flex items-center gap-5">
          <p className="text-lg font-semibold text-red-600">
            ${price.toFixed(2)}
          </p>
          {oldPrice && (
            <p className="text-md text-muted-foreground line-through">${oldPrice}</p>
          )}
        </div>

        {/* تقييم ومبيعات */}
        <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500" />
            <span>{rating} (0)</span>
          </div>
          <p>{sold} Sold</p>
        </div>

        {/* زر الشراء */}
        <div className=" flex justify-between items-center mx-1 gap-2">
          <ShoppingCart size={40}
            onClick={() => addToCart(product)}
            className="border border-border rounded-lg py-2 text-primary mt-3 hover:bg-accent hover:text-accent-foreground hover:cursor-pointer" />
            
          <Link to={`/product/${id}`}>
            <Eye 
              size={38} 
              className="border border-border hover:border-primary/50 rounded-lg p-2 text-primary hover:bg-accent hover:text-accent-foreground mt-3 transition-all cursor-pointer"
            />
          </Link>
          <button className="w-[60%] border border-primary text-primary rounded-lg py-1.5 mt-3 flex items-center justify-center gap-2 hover:bg-primary/10 transition-all">
            <Lock size={16} />
            {t('product.buyNow', 'Buy Now')}
          </button>

        </div>

      </div>
   
    </div>
  );
}

export default ProductCard;
