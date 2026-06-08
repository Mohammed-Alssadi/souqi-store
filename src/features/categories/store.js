import { create } from 'zustand';
import categories from './services/categoriesData';

export const useCategoryStore = create((set) => ({
  items: categories,
}));
