import { Route } from "react-router";
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
        return (
          <>
            <Navbar />
            <Component {...routeProps} />
          </>
        );
      }}
    />
  );
};
