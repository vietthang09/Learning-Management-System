import { Route, useHistory } from "react-router";
import { getToken, isTeacher } from "../../api/Session";
import Navbar from "../Navbar";

function RouteForTeacher({ exact, path, type, component: Component, ...rest }) {
  const history = useHistory();
  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(routeProps) => {
        return getToken() && isTeacher() ? (
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

export default RouteForTeacher;
