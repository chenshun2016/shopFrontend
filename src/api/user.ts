import axiosInstance from './service';
import { User, ApiResponse } from './types/api.types';

// 用户相关 API
export const userApi = {
  // 获取用户列表
  getUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get<ApiResponse<User[]>>('/users');
    return response.data.data;
  },

  // 获取单个用户
  getUserById: async (id: number): Promise<User> => {
    const response = await axiosInstance.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
  },

  // 创建用户
  createUser: async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    const response = await axiosInstance.post<ApiResponse<User>>('/users', userData);
    return response.data.data;
  },
}