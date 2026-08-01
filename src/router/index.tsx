// src/router/index.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import { routes } from './routes';
import LoadingSpinner from '../components/LoadingSpinner';

// 使用 useRoutes Hook（推荐）
export const AppRouter: React.FC = () => {
  const element = useRoutes(routes);
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {element}
    </Suspense>
  );
};
