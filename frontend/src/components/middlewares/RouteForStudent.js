import { Route, useHistory } from "react-router";
import { checkActive, getToken, isStudent } from "../../api/Session";
import Unactive from "../../pages/Unactive";
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

export default RouteForStudent;
