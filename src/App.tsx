import { Routes, Route, PathRouteProps, HashRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "components/core/ErrorBoundary";
import Modal from "components/core/Modal";
import HomePage from "pages/home";
import MerchantPage from "pages/merchant";
import ItemPage from "pages/item";
import PaymentPage from "pages/payment";
import ManageOrders from "pages/order/components/ManageOrders";
import SettingPage from "pages/setting";
import LoginPage from "pages/authen/components/Login";
import DashboardOrderPage from "pages/admin/components/DashboardOrderPage";
import { CustomerRoute, AdminRoute } from "components/core/PrivateRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 5e6,
    },
  },
});

const customerRoutes: PathRouteProps[] = [
  {
    path: "/",
    element: (
      <CustomerRoute userRole="customer">
        <HomePage />
      </CustomerRoute>
    ),
  },
  {
    path: "/merchant",
    element: (
      <CustomerRoute userRole="customer">
        <MerchantPage />
      </CustomerRoute>
    ),
  },
  {
    path: "/items",
    element: (
      <CustomerRoute userRole="customer">
        <ItemPage />
      </CustomerRoute>
    ),
  },
  {
    path: "/payment",
    element: (
      <CustomerRoute userRole="customer">
        <PaymentPage />
      </CustomerRoute>
    ),
  },
  {
    path: "/manage-orders",
    element: (
      <CustomerRoute userRole="customer">
        <ManageOrders />
      </CustomerRoute>
    ),
  },
];

const adminRoute: PathRouteProps[] = [
  {
    path: "/dashboard-order",
    element: (
      <AdminRoute userRole="admin">
        <DashboardOrderPage />
      </AdminRoute>
    ),
  },
];

const routes: PathRouteProps[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/setting",
    element: <SettingPage />,
  },
  ...customerRoutes,
  ...adminRoute,
];

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <HashRouter>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <React.Suspense fallback="...">{element}</React.Suspense>
              }
            />
          ))}
        </Routes>
        <Modal />
      </HashRouter>
    </QueryClientProvider>
  </ErrorBoundary>
);
export default App;
