import { Route, useHistory } from "react-router";
import { getToken, isAdmin } from "../../api/Session";
import Navbar from "../Navbar";

function RouteForAdmin({ exact, path, type, component: Component, ...rest }) {
  const history = useHistory();
  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(routeProps) => {
        return getToken() && isAdmin() ? (
          <>
            <Navbar />
            <Component {...routeProps} />
          </>
        ) : (
          history.goBack()
        );
      }}
    />
  );
}

export default RouteForAdmin;
