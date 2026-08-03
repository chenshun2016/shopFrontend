// src/store/FavoritesProvider.tsx
// 收藏数据源：localStorage 持久化，全应用共享
import { useState } from 'react';
import type { ReactNode } from 'react';
import { message } from 'antd';
import { FavoritesContext } from './favorites';
import type { Product } from '@/api/types/api.types';
import { storage } from '@/utils/storage';

const FAVORITES_KEY = 'favorites';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>(
    () => storage.getJSON<Product[]>(FAVORITES_KEY) ?? []
  );

  const persist = (next: Product[]) => {
    setFavorites(next);
    storage.setJSON(FAVORITES_KEY, next);
  };

  const isFavorite = (id: string | number) => favorites.some((f) => f.id === id);

  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      persist(favorites.filter((f) => f.id !== product.id));
      message.info(`已取消收藏「${product.name}」`);
    } else {
      persist([...favorites, product]);
      message.success(`已收藏「${product.name}」`);
    }
  };

  // 批量收藏（去重），购物车批量收藏用
  const addFavorites = (products: Product[]) => {
    const next = [...favorites];
    let added = 0;
    products.forEach((p) => {
      if (!next.some((f) => f.id === p.id)) {
        next.push(p);
        added += 1;
      }
    });
    if (added > 0) {
      persist(next);
      message.success(`已收藏 ${added} 件商品`);
    }
  };

  const clearFavorites = () => persist([]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, addFavorites, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
