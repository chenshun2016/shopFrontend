import axiosInstance from './service';
import { favoriteAPiAdd } from './types/api.favorite.types';

export const favoriteApi = {
  add: async(productId: number) : Promise<favoriteAPiAdd> => {
    const res = await axiosInstance.post<favoriteAPiAdd>(`/api/favorites/${productId}`);
    return res.data;
  }
}