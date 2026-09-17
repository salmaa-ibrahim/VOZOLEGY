import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const Home = lazy(() => import('../pages/Home/Home'));
const CategoryDetails = lazy(() => import('../pages/Categories/CategoryDetailsPage'));
const ProductDetails = lazy(() => import('../pages/Products/ProductDetailsPage'));
const CartPage = lazy(() => import('../pages/Cart/CartPage'));
const Checkout = lazy(() => import('../pages/Checkout/CheckoutPage'));
const HowToChoose = lazy(() => import('../pages/HowToChoose/HowToChoosePage'));
const NotFound = lazy(() => import('../pages/NotFound/NotFoundPage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="page-loader">Loading...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="categories/:slug" element={<CategoryDetails />} />
          <Route path="products/:slug" element={<ProductDetails />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="how-to-choose" element={<HowToChoose />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;