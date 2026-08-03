// src/App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { FavoritesProvider } from './store/FavoritesProvider';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;