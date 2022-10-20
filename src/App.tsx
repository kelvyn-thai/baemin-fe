import { Routes, Route, HashRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "components/core/ErrorBoundary";
import Modal from "components/core/Modal";

import(/* webpackPrefetch: true */ "components/core/Modal");
import(/* webpackPrefetch: true */ "components/core/FixedBottom");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 5e6,
    },
  },
});

const HomePageLazy = React.lazy(() => import("pages/home"));
const MerchantPageLazy = React.lazy(() => import("pages/merchant"));
const LoginPageLazy = React.lazy(() => import("pages/authen/components/Login"));
const SettingPageLazy = React.lazy(() => import("pages/setting/"));
const ItemPageLazy = React.lazy(() => import("pages/item"));
const PaymentPageLazy = React.lazy(() => import("pages/payment"));
const ManageOrdersPageLazy = React.lazy(
  () => import("pages/order/components/ManageOrders")
);
const DashboardOrderPageLazy = React.lazy(
  () => import("pages/admin/components/DashboardOrderPage")
);

const customerRoutes = [
  {
    path: "/",
    element: <HomePageLazy />,
  },
  {
    path: "/merchant",
    element: <MerchantPageLazy />,
  },
  {
    path: "/items",
    element: <ItemPageLazy />,
  },
  {
    path: "/payment",
    element: <PaymentPageLazy />,
  },
  {
    path: "/manage-orders",
    element: <ManageOrdersPageLazy />,
  },
];

const adminRoute = [
  {
    path: "/dashboard-order",
    element: <DashboardOrderPageLazy />,
  },
];

const routes = [
  {
    path: "/login",
    element: <LoginPageLazy />,
  },
  {
    path: "/setting",
    element: <SettingPageLazy />,
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
                <React.Suspense fallback="...">
                  {element as unknown as React.ReactNode}
                </React.Suspense>
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
