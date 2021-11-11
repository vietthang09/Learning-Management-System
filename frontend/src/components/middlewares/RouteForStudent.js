import { Route, useHistory } from "react-router";
import { getToken, isStudent } from "../../api/Session";
import Navbar from "../Navbar";

function RouteForStudent({ exact, path, type, component: Component, ...rest }) {
  const history = useHistory();
  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(routeProps) => {
        return getToken() && isStudent() ? (
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

export default RouteForStudent;
