import React from "react";
import { useCartStore } from '../store';
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function CartPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');
  const cartItems = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  // حساب الاجمالي
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <ShoppingBag size={80} className="mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-3xl font-bold mb-3 text-foreground">{t('cart.emptyTitle', 'Your Cart is Empty')}</h2>
        <p className="text-muted-foreground mb-6">{t('cart.emptyDesc', 'Add some products to your cart to see them here')}</p>
        <Button asChild size="lg" className="rounded-full shadow-md">
          <Link to="/">
            {t('cart.continueShopping', 'Continue Shopping')}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <h2 className="text-3xl font-bold text-foreground mb-10"> {t('cart.shoppingCart', 'Shopping Cart')}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 🧺 قائمة المنتجات */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* مابينق للعناصر */}
          {cartItems.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-6 p-4 hover:shadow-lg transition-all duration-300 border-border"
            >
              <div className="bg-white dark:bg-white shrink-0 rounded-xl p-2 border border-border/50">
                <img
                  src={item.image}
                  alt={isAr ? item.title_ar : item.title_en}
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="flex-1 w-full text-center sm:text-start">
                <h3 className="text-lg font-semibold text-foreground">{isAr ? item.title_ar : item.title_en}</h3>
                <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>

                <div className="flex items-center justify-center sm:justify-start mt-3 gap-3">
                  <Button 
                    variant="secondary"
                    size="icon"
                    onClick={() => decreaseQty(item.id)}
                    className="h-8 w-8 rounded-full"
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="text-foreground font-medium">{item.quantity}</span>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => increaseQty(item.id)}
                    className="h-8 w-8 rounded-full"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-border">
                <span className="text-lg font-semibold text-foreground">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 sm:mt-3"
                >
                  <Trash2 size={20} />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* 💳 ملخص الطلب */}
        <Card className="p-6 h-fit sticky top-10 border-border">
          <h3 className="text-2xl font-bold mb-6 text-foreground border-b border-border pb-3">{t('cart.orderSummary', 'Order Summary')}</h3>

          <div className="flex flex-col gap-3 text-muted-foreground mb-6">
            <div className="flex justify-between">
              {/* الاجمالي الفرعي */}
              <span>{t('cart.subtotal', 'Subtotal')}</span>
              <span className="text-foreground">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('cart.shipping', 'Shipping')}</span>
              <span className="text-primary font-medium">{t('cart.free', 'Free')}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between text-lg font-semibold">
              <span className="text-foreground">{t('cart.total', 'Total')}</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <Button className="w-full py-6 text-lg rounded-full shadow-md font-semibold mb-4">
            {t('cart.proceedToCheckout', 'Proceed to Checkout')}
          </Button>

          <Button variant="link" className="w-full text-muted-foreground hover:text-primary font-medium transition" asChild>
            <Link to="/">
              <span className={isAr ? "rotate-180 inline-block mx-2" : "inline-block mx-2"}>&larr;</span> {t('cart.continueShoppingBtn', 'Continue Shopping')}
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default CartPage;
