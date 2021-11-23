import { Route, useHistory } from "react-router";
import { checkActive, getToken, isAdmin } from "../../api/Session";
import Unactive from "../../pages/Unactive";
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
          checkActive() ? (
            <>
              <Navbar />
              <Component {...routeProps} />
            </>
          ) : (
            <Unactive />
          )
        ) : (
          history.goBack()
        );
      }}
    />
  );
}

export default RouteForAdmin;
