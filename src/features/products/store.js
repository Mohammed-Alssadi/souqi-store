import { create } from 'zustand';
import products from './services/productsData';

export const useProductStore = create((set) => ({
  items: products,
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  addProduct: (product) => set((state) => ({ items: [...state.items, product] })),
  removeProduct: (id) => set((state) => ({ items: state.items.filter(p => p.id !== id) })),
  updateProduct: (updatedProduct) => set((state) => ({
    items: state.items.map(p => p.id === updatedProduct.id ? updatedProduct : p)
  }))
}));
