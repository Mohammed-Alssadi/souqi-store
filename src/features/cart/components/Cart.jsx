import React from 'react';
import { ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Sheet, SheetContent } from "../../../components/ui/sheet";
import { useCartStore } from "../store";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
            <Divider className="bg-border" />
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
              <Link
                to="/"
                onClick={() => { setvisible(false) }}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition shadow-md"
              >
                {t('cart.continueShopping', 'Continue Shopping')}
              </Link>
            </div>
          ) : (
            <>
              {/* 🧺 المنتجات */}
              <div className="flex-1 overflow-y-auto pe-2 space-y-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-secondary/50 pb-4">
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
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="bg-primary/10 text-primary hover:bg-primary/20 p-1 rounded-full transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-medium text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="bg-primary/10 text-primary hover:bg-primary/20 p-1 rounded-full transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="font-semibold text-foreground text-xs md:text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-red-600 mt-2"
                      >
                        <Trash2 size={18} />
                      </button>
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
                  <button 
                    onClick={() => setvisible(false)}
                    className="flex items-center gap-1 text-primary md:py-3 md:px-4 border border-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition text-sm py-2 px-2"
                  >
                    <span className={isAr ? "rotate-180" : ""}>&larr;</span> {t('cart.continueShoppingBtn', 'Continue Shopping')}
                  </button>
                  <Link
                    to="/"
                    onClick={() => setvisible(false)}
                  >
                    <button className="md:px-5 bg-primary text-primary-foreground md:py-3 rounded-lg font-semibold hover:bg-primary/90 transition text-sm py-2 px-2 shadow-md">
                      {t('cart.checkout', 'Checkout')}
                    </button>
                  </Link>
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
