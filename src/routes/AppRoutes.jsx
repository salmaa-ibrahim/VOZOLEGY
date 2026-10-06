// // import { lazy, Suspense } from "react";
// // import { Route, Routes } from "react-router-dom";
// // import MainLayout from "../layouts/MainLayout";
// // import ProtectedRout from "./ProtectedRout";
// // import AdminRout from "./AdminRout";
// // import OrdersPage from "../pages/admin/orders/OrdersPage";
// // import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
// // // import OrdersPage from "../pages/admin/orders/OrdersPage
// // const Home = lazy(() => import("../pages/Home/Home"));
// // const CategoryDetails = lazy(
// //   () => import("../pages/Categories/CategoryDetailsPage"),
// // );
// // const ProductDetails = lazy(
// //   () => import("../pages/Products/ProductDetailsPage"),
// // );
// // const CartPage = lazy(() => import("../pages/Cart/CartPage"));
// // const Checkout = lazy(() => import("../pages/Checkout/CheckoutPage"));
// // const HowToChoose = lazy(() => import("../pages/HowToChoose/HowToChoosePage"));
// // const NotFound = lazy(() => import("../pages/NotFound/NotFoundPage"));

// // const LoginPage = lazy(() => import("../pages/Login/LoginPage"));
// // const RegisterPage = lazy(() => import("../pages/Login/RegisterPage"));
// // const ForgotPasswordPage = lazy(
// //   () => import("../pages/Login/ForgotPasswordPage"),
// // );
// // const ResetPasswordPage = lazy(
// //   () => import("../pages/Login/ResetPasswordPage"),
// // );
// // const AccountPage = lazy(() => import("../pages/Account/AccountPage"));
// // const AdminDashboardPage = lazy(
// //   () => import("../pages/admin/AdminDashboardPage"),
// // );

// // export default function AppRoutes() {
// //   return (
// //     <Suspense
// //       fallback={
// //         <div className="page-loader" role="status">
// //           Loading…
// //         </div>
// //       }
// //     >
// //       <Routes>
// //         <Route path="/" element={<MainLayout />}>
// //           <Route index element={<Home />} />
// //           <Route path="categories/:slug" element={<CategoryDetails />} />
// //           <Route path="products/:slug" element={<ProductDetails />} />
// //           <Route path="cart" element={<CartPage />} />
// //           <Route path="checkout" element={<Checkout />} />
// //           <Route path="how-to-choose" element={<HowToChoose />} />
// //           <Route path="/admin/orders" element={<OrdersPage />} />
// //         </Route>
// // <Route
// //   path="/admin"
// //   element={<AdminDashboardPage />}
// // />

// // <Route
// //   path="/admin/orders"
// //   element={<OrdersPage />}
// // />
// //         <Route path="/login" element={<LoginPage />} />
// //         <Route path="/register" element={<RegisterPage />} />
// //         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
// //         <Route path="/reset-password" element={<ResetPasswordPage />} />

// //         <Route
// //           path="/account"
// //           element={
// //             <ProtectedRout>
// //               <AccountPage />
// //             </ProtectedRout>
// //           }
// //         />

// //         <Route
// //           path="/admin"
// //           element={
// //             <AdminRout>
// //               <AdminDashboardPage />
// //             </AdminRout>
// //           }
// //         />

// //         <Route path="*" element={<NotFound />} />
// //       </Routes>
// //     </Suspense>
// //   );
// // }

// import { lazy, Suspense } from "react";
// import { Route, Routes } from "react-router-dom";

// import MainLayout from "../layouts/MainLayout";
// import ProtectedRout from "./ProtectedRout";
// import AdminRout from "./AdminRout";

// const Home = lazy(() => import("../pages/Home/Home"));

// const CategoryDetails = lazy(
//   () => import("../pages/Categories/CategoryDetailsPage")
// );

// const ProductDetails = lazy(
//   () => import("../pages/Products/ProductDetailsPage")
// );

// const CartPage = lazy(() => import("../pages/Cart/CartPage"));

// const Checkout = lazy(
//   () => import("../pages/Checkout/CheckoutPage")
// );

// const HowToChoose = lazy(
//   () => import("../pages/HowToChoose/HowToChoosePage")
// );

// const NotFound = lazy(
//   () => import("../pages/NotFound/NotFoundPage")
// );

// const LoginPage = lazy(
//   () => import("../pages/Login/LoginPage")
// );

// const RegisterPage = lazy(
//   () => import("../pages/Login/RegisterPage")
// );

// const ForgotPasswordPage = lazy(
//   () => import("../pages/Login/ForgotPasswordPage")
// );

// const ResetPasswordPage = lazy(
//   () => import("../pages/Login/ResetPasswordPage")
// );

// const AccountPage = lazy(
//   () => import("../pages/Account/AccountPage")
// );

// /* =====================================================
//    ADMIN PAGES
// ===================================================== */

// const AdminDashboardPage = lazy(
//   () => import("../pages/admin/AdminDashboardPage")
// );

// const OrdersPage = lazy(
//   () => import("../pages/admin/orders/OrdersPage")
// );

// export default function AppRoutes() {
//   return (
//     <Suspense
//       fallback={
//         <div className="page-loader" role="status">
//           Loading…
//         </div>
//       }
//     >
//       <Routes>

//         {/* =================================================
//             MAIN WEBSITE
//         ================================================= */}

//         <Route path="/" element={<MainLayout />}>

//           <Route
//             index
//             element={<Home />}
//           />

//           <Route
//             path="categories/:slug"
//             element={<CategoryDetails />}
//           />

//           <Route
//             path="products/:slug"
//             element={<ProductDetails />}
//           />

//           <Route
//             path="cart"
//             element={<CartPage />}
//           />

//           <Route
//             path="checkout"
//             element={<Checkout />}
//           />

//           <Route
//             path="how-to-choose"
//             element={<HowToChoose />}
//           />

//         </Route>

//         {/* =================================================
//             AUTH
//         ================================================= */}

//         <Route
//           path="/login"
//           element={<LoginPage />}
//         />

//         <Route
//           path="/register"
//           element={<RegisterPage />}
//         />

//         <Route
//           path="/forgot-password"
//           element={<ForgotPasswordPage />}
//         />

//         <Route
//           path="/reset-password"
//           element={<ResetPasswordPage />}
//         />

//         {/* =================================================
//             CUSTOMER ACCOUNT
//         ================================================= */}

//         <Route
//           path="/account"
//           element={
//             <ProtectedRout>
//               <AccountPage />
//             </ProtectedRout>
//           }
//         />

//         {/* =================================================
//             ADMIN DASHBOARD
//         ================================================= */}

//         <Route
//           path="/admin"
//           element={
//             <AdminRout>
//               <AdminDashboardPage />
//             </AdminRout>
//           }
//         />

//         {/* =================================================
//             ADMIN ORDERS
//         ================================================= */}

//         <Route
//           path="/admin/orders"
//           element={
//             <AdminRout>
//               <OrdersPage />
//             </AdminRout>
//           }
//         />

//         {/* =================================================
//             404
//         ================================================= */}

//         <Route
//           path="*"
//           element={<NotFound />}
//         />

//       </Routes>
//     </Suspense>
//   );
// }



import React, {
  lazy,
  Suspense,
} from "react";

import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../contexts/AuthContext";

const Home = lazy(() =>
  import("../pages/Home/Home")
);

const CategoryDetails = lazy(() =>
  import("../pages/Categories/CategoryDetailsPage")
);

const ProductDetails = lazy(() =>
  import("../pages/Products/ProductDetailsPage")
);

const CartPage = lazy(() =>
  import("../pages/Cart/CartPage")
);

const Checkout = lazy(() =>
  import("../pages/Checkout/CheckoutPage")
);

const HowToChoose = lazy(() =>
  import("../pages/HowToChoose/HowToChoosePage")
);

const NotFound = lazy(() =>
  import("../pages/NotFound/NotFoundPage")
);

const LoginPage = lazy(() =>
  import("../pages/Login/LoginPage")
);

const RegisterPage = lazy(() =>
  import("../pages/Login/RegisterPage")
);

const ForgotPasswordPage = lazy(() =>
  import("../pages/Login/ForgotPasswordPage")
);

const ResetPasswordPage = lazy(() =>
  import("../pages/Login/ResetPasswordPage")
);

const AccountPage = lazy(() =>
  import("../pages/Account/AccountPage")
);

const AdminDashboardPage = lazy(() =>
  import("../pages/admin/AdminDashboardPage")
);

const PageLoader = () => (
  <div className="page-loader">
    Loading...
  </div>
);

function RequireAuth({
  children,
  adminOnly = false,
}) {
  const {
    user,
    loading,
    isAdmin,
  } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (adminOnly && !isAdmin) {
    return (
      <Navigate
        to="/account"
        replace
      />
    );
  }

  return children;
}

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* =========================================
            ALL WEBSITE PAGES
            Header/Footer stay visible
        ========================================= */}

        <Route
          path="/"
          element={<MainLayout />}
        >
          <Route
            index
            element={<Home />}
          />

          <Route
            path="categories/:slug"
            element={<CategoryDetails />}
          />

          <Route
            path="products/:slug"
            element={<ProductDetails />}
          />

          <Route
            path="cart"
            element={<CartPage />}
          />

          <Route
            path="checkout"
            element={<Checkout />}
          />

          <Route
            path="how-to-choose"
            element={<HowToChoose />}
          />

          {/* ================================
              AUTH
          ================================= */}

          <Route
            path="login"
            element={<LoginPage />}
          />

          <Route
            path="register"
            element={<RegisterPage />}
          />

          <Route
            path="forgot-password"
            element={<ForgotPasswordPage />}
          />

          <Route
            path="reset-password"
            element={<ResetPasswordPage />}
          />

          {/* ================================
              CUSTOMER
          ================================= */}

          <Route
            path="account"
            element={
              <RequireAuth>
                <AccountPage />
              </RequireAuth>
            }
          />

          {/* ================================
              ADMIN
          ================================= */}

          <Route
            path="admin"
            element={
              <RequireAuth adminOnly>
                <AdminDashboardPage />
              </RequireAuth>
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>

      </Routes>
    </Suspense>
  );
};

export default AppRoutes;