import React from 'react';
import { ProductProvider } from './src/context/ProductContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ProductProvider>
      <AppNavigator />
    </ProductProvider>
  );
}
