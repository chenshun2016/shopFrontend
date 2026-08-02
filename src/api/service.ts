import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { tokenStorage } from '@/utils/storage';

const baseURL = "http://localhost:3000";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从 localStorage 获取 token
    const token = tokenStorage.getAccessToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 添加请求日志（开发环境）
    // if (process.env.NODE_ENV === 'development') {
    //   console.log('🚀 [Request]', config.method?.toUpperCase(), config.url, config.data);
    // }
    
    return config;
  },
  (error) => {
    console.error('❌ [Request Error]', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 响应日志（开发环境）
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // 处理 401 未授权 - Token 刷新逻辑
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = tokenStorage.getRefreshToken();
        if (refreshToken) {
          // 调用刷新 token 接口
          const response = await axios.post(`${baseURL}/auth/refresh`, {
            refreshToken,
          });
          
          const { accessToken } = response.data;
          tokenStorage.setAccessToken(accessToken);
          
          // 重新发送原始请求
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // 刷新失败，跳转到登录页
        tokenStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // 统一错误处理
    const errorMessage = error.response?.data?.message || error.message || '请求失败';
    console.error('❌ [Response Error]', errorMessage);
    
    return Promise.reject(error);
  }
);

export default axiosInstance;


console.log(123)
