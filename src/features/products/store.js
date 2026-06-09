import { create } from 'zustand';
import products from './services/productsData';

export const useProductStore = create((set) => ({
  items: [],
  isLoading: true,
  fetchProducts: async () => {
    set({ isLoading: true });
    // محاكاة جلب حقيقي من السيرفر لمدة 1.2 ثانية (يستبدل لاحقاً بربط Supabase)
    setTimeout(() => {
      set({ items: products, isLoading: false });
    }, 1200);
  },
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  addProduct: (product) => set((state) => ({ items: [...state.items, product] })),
  removeProduct: (id) => set((state) => ({ items: state.items.filter(p => p.id !== id) })),
  updateProduct: (updatedProduct) => set((state) => ({
    items: state.items.map(p => p.id === updatedProduct.id ? updatedProduct : p)
  }))
}));
