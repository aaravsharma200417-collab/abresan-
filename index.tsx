
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AdminProvider } from './context/AdminContext';
import { PriceListProvider } from './context/PriceListContext';
import { BlogProvider } from './context/BlogContext';
import { ReviewProvider } from './context/ReviewContext';
import { ComparisonProvider } from './context/ComparisonContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <AdminProvider>
          <PriceListProvider>
            <BlogProvider>
              <ReviewProvider>
                <ComparisonProvider>
                  <App />
                </ComparisonProvider>
              </ReviewProvider>
            </BlogProvider>
          </PriceListProvider>
        </AdminProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);
