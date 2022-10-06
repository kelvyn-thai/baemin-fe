import { Routes, Route, PathRouteProps, HashRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRoutesStore } from "zustand-store/routes";
import ErrorBoundary from "components/core/ErrorBoundary";
import ModalAntd from "components/antd/Modal";
import Modal from "components/core/Modal";
import HomePage from "pages/home";
import DriverPage from "pages/driver";
import MerchantPage from "pages/merchant";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 5e6,
    },
  },
});

const allRoutes: PathRouteProps[] = [
  { path: "/", element: <HomePage /> },
  { path: "/driver", element: <DriverPage /> },
  { path: "/merchant/:categoryId", element: <MerchantPage /> },
];

const AllRoutes = ({ routes }: { routes: PathRouteProps[] }) => (
  <Routes>
    {routes.map(({ path, element }) => (
      <Route
        key={path}
        path={path}
        element={<React.Suspense fallback="...">{element}</React.Suspense>}
      />
    ))}
  </Routes>
);

const App = () => {
  const { routes, actionSetRoutes: setRoutes } = useRoutesStore();
  const handleLoadRoutes = React.useCallback(() => {
    setRoutes(allRoutes);
  }, []);
  React.useEffect(() => {
    handleLoadRoutes();
  }, []);
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen />
        <HashRouter>
          <AllRoutes routes={routes} />
          <ModalAntd />
          <Modal />
        </HashRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
export default App;
