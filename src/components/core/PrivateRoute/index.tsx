import { useAuthenStore } from "pages/authen";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export interface IPrivateRoute {
  userRole: "admin" | "customer";
  children: React.ReactNode | React.ReactElement | any;
}
export const withPrivateRoute =
  (Comp: React.FC<IPrivateRoute>) => (props: IPrivateRoute) => {
    const { isLoggedIn, userInfo } = useAuthenStore();
    const location = useLocation();
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    const { children, userRole } = props;
    if (userRole !== userInfo.role && location.pathname !== "/") {
      return <Navigate to="/" replace />;
    }
    return <Comp {...{ ...props }}>{children}</Comp>;
  };

export const CustomerRoute = withPrivateRoute((props) => {
  const { children } = props;
  return children;
});

export const AdminRoute = withPrivateRoute((props) => {
  const { children } = props;
  return children;
});
