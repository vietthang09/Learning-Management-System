import { Redirect, Route } from "react-router";
import { getToken } from "../api/Session";
import Navbar from "./Navbar";

export const RouteWithNav = ({
  exact,
  path,
  type,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(routeProps) => {
        return getToken() ? (
          <>
            <Navbar />
            <Component {...routeProps} />
          </>
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};
