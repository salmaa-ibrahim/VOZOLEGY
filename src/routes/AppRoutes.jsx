// import React, { lazy, Suspense } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import MainLayout from '../layouts/MainLayout';

// const Home = lazy(() => import('../pages/Home/Home'));
// const CategoryDetails = lazy(() => import('../pages/Categories/CategoryDetailsPage'));
// const ProductDetails = lazy(() => import('../pages/Products/ProductDetailsPage'));
// const CartPage = lazy(() => import('../pages/Cart/CartPage'));
// const Checkout = lazy(() => import('../pages/Checkout/CheckoutPage'));
// const HowToChoose = lazy(() => import('../pages/HowToChoose/HowToChoosePage'));
// const NotFound = lazy(() => import('../pages/NotFound/NotFoundPage'));

// const AppRoutes = () => {
//   return (
//     <Suspense fallback={<div className="page-loader">Loading...</div>}>
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route index element={<Home />} />
//           <Route path="categories/:slug" element={<CategoryDetails />} />
//           <Route path="products/:slug" element={<ProductDetails />} />
//           <Route path="cart" element={<CartPage />} />
//           <Route path="checkout" element={<Checkout />} />
//           <Route path="how-to-choose" element={<HowToChoose />} />
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </Suspense>
//   );
// };

// export default AppRoutes;











import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../contexts/AuthContext';

const Home = lazy(() => import('../pages/Home/Home'));
const CategoryDetails = lazy(() => import('../pages/Categories/CategoryDetailsPage'));
const ProductDetails = lazy(() => import('../pages/Products/ProductDetailsPage'));
const CartPage = lazy(() => import('../pages/Cart/CartPage'));
const Checkout = lazy(() => import('../pages/Checkout/CheckoutPage'));
const HowToChoose = lazy(() => import('../pages/HowToChoose/HowToChoosePage'));
const NotFound = lazy(() => import('../pages/NotFound/NotFoundPage'));

const LoginPage = lazy(() => import('../pages/Login/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Login/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/Login/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/Login/ResetPasswordPage'));
const AccountPage = lazy(() => import('../pages/Account/AccountPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));

function RequireAuth({ children, adminOnly = false }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <div className="page-loader">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/account" replace />;

  return children;
}

const AppRoutes = () => (
  <Suspense fallback={<div className="page-loader">Loading...</div>}>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="categories/:slug" element={<CategoryDetails />} />
        <Route path="products/:slug" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="how-to-choose" element={<HowToChoose />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route
        path="/account"
        element={<RequireAuth><AccountPage /></RequireAuth>}
      />
      <Route
        path="/admin"
        element={
          <RequireAuth adminOnly>
            <AdminDashboardPage />
          </RequireAuth>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;

