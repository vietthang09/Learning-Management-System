import { Redirect, Route } from "react-router";
import { getToken } from "../api/Session";

function RouteGuest({ exact, path, type, component: Component, ...rest }) {
  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(routeProps) => {
        return getToken() ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          <>
            <Component {...routeProps} />
          </>
        );
      }}
    />
  );
}

export default RouteGuest;
