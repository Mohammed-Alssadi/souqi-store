import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              )
            };
          } else {
            return { items: [...state.items, { ...product, quantity: 1 }] };
          }
        });
        toast.success("تم الإضافة للسلة بنجاح");
      },
      removeFromCart: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      })),
      increaseQty: (id) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      })),
      decreaseQty: (id) => set((state) => {
        const existingItem = state.items.find((item) => item.id === id);
        if (existingItem?.quantity > 1) {
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
          };
        } else {
          return {
            items: state.items.filter((item) => item.id !== id)
          };
        }
      }),
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'cart-storage', // name of the item in the storage (must be unique)
    }
  )
);
