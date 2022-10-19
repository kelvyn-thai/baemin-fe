import { Routes, Route, HashRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "components/core/ErrorBoundary";
import Modal from "components/core/Modal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 5e6,
    },
  },
});

const customerRoutes = [
  {
    path: "/",
    element: React.lazy(() => import("pages/home")),
  },
  {
    path: "/merchant",
    element: React.lazy(() => import("pages/merchant")),
  },
  {
    path: "/items",
    element: React.lazy(() => import("pages/item")),
  },
  {
    path: "/payment",
    element: React.lazy(() => import("pages/payment")),
  },
  {
    path: "/manage-orders",
    element: React.lazy(() => import("pages/order/components/ManageOrders")),
  },
];

const adminRoute = [
  {
    path: "/dashboard-order",
    element: React.lazy(
      () => import("pages/admin/components/DashboardOrderPage")
    ),
  },
];

const routes: {
  path: string;
  element:
    | React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>
    | React.LazyExoticComponent<React.NamedExoticComponent<() => JSX.Element>>
    | JSX.Element
    | React.ReactNode;
}[] = [
  {
    path: "/login",
    element: React.lazy(() => import("pages/authen/components/Login")),
  },
  {
    path: "/setting",
    element: React.lazy(() => import("pages/setting/")),
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
