import { create } from 'zustand';
import categories from './services/categoriesData';

export const useCategoryStore = create((set) => ({
  items: [],
  isLoading: true,
  fetchCategories: async () => {
    set({ isLoading: true });
    // محاكاة جلب حقيقي من السيرفر
    setTimeout(() => {
      set({ items: categories, isLoading: false });
    }, 1000);
  }
}));
