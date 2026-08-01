// src/types/api.types.ts

// ============ 通用响应类型 ============
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
  timestamp?: string;
}

export interface ApiError {
  code: number;
  message: string;
  details?: string;
  path?: string;
  timestamp?: string;
}

// ============ 分页类型 ============
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// ============ 用户相关类型 ============
export interface User {
  id: number | string;
  username: string;
  email: string;
  password: string,
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  permissions?: string[];
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
  GUEST = 'guest',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

// ============ 认证相关类型 ============
export interface LoginRequest {
  username: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirmRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// ============ 请求参数类型 ============
export interface GetUsersParams extends PaginationParams {
  username?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
  search?: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  status?: UserStatus;
  avatar?: string;
}

// ============ 产品相关类型（示例） ============
export interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  isActive?: boolean;
}

export interface GetProductsParams extends PaginationParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  name?: string;
  inStock?: boolean;
}

// ============ 订单相关类型（示例） ============
export interface Order {
  id: number | string;
  orderNumber: string;
  userId: number | string;
  user: User;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number | string;
  productId: number | string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  WECHAT = 'wechat',
  ALIPAY = 'alipay',
  BANK_TRANSFER = 'bank_transfer',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export interface ShippingAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  recipientName: string;
}

export interface CreateOrderRequest {
  items: {
    productId: number | string;
    quantity: number;
  }[];
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
  notes?: string;
}

// ============ 文件上传类型 ============
export interface FileUploadRequest {
  file: File;
  folder?: string;
  metadata?: Record<string, any>;
}

export interface FileUploadResponse {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  size: number;
  mimeType: string;
  folder: string;
  createdAt: string;
}

export interface FileListResponse extends PaginationResponse<FileUploadResponse> {}

// ============ 通知相关类型 ============
export interface Notification {
  id: number | string;
  userId: number | string;
  title: string;
  content: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  data?: Record<string, any>;
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  SYSTEM = 'system',
}

// ============ 搜索类型 ============
export interface SearchRequest {
  query: string;
  filters?: Record<string, any>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface SearchResponse<T> extends PaginationResponse<T> {
  searchQuery: string;
  suggestion?: string[];
}

// ============ 统计类型 ============
export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  recentOrders: Order[];
  userGrowth: {
    date: string;
    count: number;
  }[];
  revenueByCategory: {
    category: string;
    amount: number;
  }[];
}