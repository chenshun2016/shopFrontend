import axiosInstance from './service';
import { GoodsResData, GetGoodsApi, GoodsDetail } from './types/api.goods.types';
import { Product, ApiResponse } from './types/api.types';

// 商品相关 API
export const goodsApi = {
  // 获取商品列表
  getGoodsList: async (params?: GetGoodsApi): Promise<GoodsResData<Product>> => {
    const response = await axiosInstance.get<ApiResponse<GoodsResData<Product>>>('/api/products', { params });
    return response.data.data;
  },
  getGoodDetail: async(id: number): Promise<GoodsDetail> => {
    const response = await axiosInstance.get<ApiResponse<GoodsDetail>>(`/api/products/${id}`);
    return response.data.data; 
  }
}
