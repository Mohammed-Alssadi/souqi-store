import React from 'react';
import { ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useCartStore } from "../store";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

function Cart({ visible, setvisible }) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language.startsWith('ar');
  const cartItems = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Sheet open={visible} onOpenChange={setvisible} className="dark:bg-black">
      <SheetContent
        side="end"
        className="bg-background text-foreground pt-5 px-4 w-[85vw] sm:w-[430px] sm:max-w-md flex flex-col"
      >
        <div dir={isAr ? "rtl" : "ltr"} className="flex flex-col h-full overflow-hidden">
          {/* 🧾 الهيدر */}
          <div className="flex justify-between items-center mb-2 shrink-0">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-2 mx-4">
              <ShoppingBag size={40} className="text-primary text-4xl" /> {t('cart.myCart', 'My Cart')}
              <span className="text-muted-foreground mx-5 text-2xl"> [ {cartItems.length} ]</span>
            </h2>
          </div>
          <div className="mb-4 pt-2 shrink-0">
            <hr className="border-border" />
          </div>

          {/* 🛍️ محتوى السلة */}
          {cartItems.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-[60vh] text-center">
              <ShoppingBag size={70} className="text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                {t('cart.emptyTitle', 'Your Cart is Empty')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('cart.emptyDesc', 'Add some products to your cart to see them here.')}
              </p>
              <Button
                asChild
                onClick={() => { setvisible(false) }}
                size="lg"
                className="rounded-full shadow-md"
              >
                <Link to="/">
                  {t('cart.continueShopping', 'Continue Shopping')}
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* 🧺 المنتجات */}
              <div className="flex-1 flex flex-col overflow-y-auto pe-2 gap-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-secondary/50 pb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-background dark:bg-accent/20 border border-border rounded-md p-3 shadow-sm hover:shadow transition"
                  >
                    <div className="bg-white dark:bg-white/90 p-1 rounded-md">
                      <img
                        src={item.image}
                        alt={isAr ? item.title_ar : item.title_en}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs md:text-sm font-semibold text-foreground">
                        {isAr ? item.title_ar : item.title_en}
                      </h3>
                      <p className="text-primary font-medium text-xs md:text-sm">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => decreaseQty(item.id)}
                          className="h-6 w-6 rounded-full"
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="font-medium text-foreground">{item.quantity}</span>
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => increaseQty(item.id)}
                          className="h-6 w-6 rounded-full"
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="font-semibold text-foreground text-xs md:text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-2 h-8 w-8"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 💳 ملخص الطلب */}
              <div className="bg-card shadow-[0_-4px_10px_rgba(0,0,0,0.05)] border-t border-border rounded-xl mt-auto shrink-0 pb-6 pt-2">
                <div className="flex justify-around font-semibold text-lg pt-3 px-5 mx-4 text-foreground">
                  <span>{t('cart.total', 'Total')}</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-center gap-4 items-center px-4 my-4 mb-2">
                  <Button 
                    variant="outline"
                    onClick={() => setvisible(false)}
                    className="flex-1 font-semibold"
                  >
                    <span className={isAr ? "rotate-180" : ""}>&larr;</span> {t('cart.continueShoppingBtn', 'Continue Shopping')}
                  </Button>
                  <Button
                    asChild
                    onClick={() => setvisible(false)}
                    className="flex-1 font-semibold shadow-md"
                  >
                    <Link to="/">
                      {t('cart.checkout', 'Checkout')}
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
