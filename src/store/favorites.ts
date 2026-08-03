// src/store/favorites.ts
// 收藏状态：Context + useFavorites 钩子（Provider 在 FavoritesProvider.tsx 中）
import { createContext, useContext } from 'react';
import type { Product } from '@/api/types/api.types';

export interface FavoritesContextValue {
  favorites: Product[];
  isFavorite: (id: string | number) => boolean;
  toggleFavorite: (product: Product) => void;
  addFavorites: (products: Product[]) => void;
  clearFavorites: () => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites 必须在 FavoritesProvider 内使用');
  }
  return ctx;
};
