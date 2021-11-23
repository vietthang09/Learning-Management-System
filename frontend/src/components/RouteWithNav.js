import { Redirect, Route } from "react-router";
import { getToken, checkActive } from "../api/Session";
import Unactive from "../pages/Unactive";
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
          checkActive() ? (
            <>
              <Navbar />
              <Component {...routeProps} />
            </>
          ) : (
            <Unactive />
          )
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};
