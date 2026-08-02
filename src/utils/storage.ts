// src/utils/storage.ts
// 浏览器本地存储封装（localStorage 持久 / sessionStorage 会话级）

export const storage = {
  get: (key: string): string | null => localStorage.getItem(key),
  set: (key: string, value: string): void => localStorage.setItem(key, value),
  remove: (key: string): void => localStorage.removeItem(key),

  // 存储 JSON 对象
  getJSON: <T>(key: string): T | null => {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
  setJSON: (key: string, value: unknown): void =>
    localStorage.setItem(key, JSON.stringify(value)),
};

// 会话级（关标签页即失效）
export const session = {
  get: (key: string): string | null => sessionStorage.getItem(key),
  set: (key: string, value: string): void => sessionStorage.setItem(key, value),
  remove: (key: string): void => sessionStorage.removeItem(key),
};

// 项目专用的 token 管理（配合 src/api/service.ts 的 axios 拦截器）
export const tokenStorage = {
  getAccessToken: (): string | null => localStorage.getItem('accessToken'),
  setAccessToken: (token: string): void => localStorage.setItem('accessToken', token),
  getRefreshToken: (): string | null => localStorage.getItem('refreshToken'),
  setRefreshToken: (token: string): void => localStorage.setItem('refreshToken', token),
  clear: (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};
