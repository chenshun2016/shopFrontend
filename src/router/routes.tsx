// src/router/routes.ts
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// 导入模块路由
import { userRoutes } from './modules/user.routes';

// 公开页面
const Home = lazy(() => import('../pages/Home'));
const GoodDetail = lazy(() => import('../pages/goods/goodDetail'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const NotFound = lazy(() => import('../pages/NotFound'));

// 所有路由配置
export const routes: RouteObject[] = [
  // 主布局路由
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'goodDetail/:id', element: <GoodDetail />},
      // 模块路由
      ...userRoutes,
    ],
  },
  
  // 认证路由（无布局或特殊布局）
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  
  // 404 路由
  { path: '*', element: <NotFound /> },
];