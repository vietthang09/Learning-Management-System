import { Redirect, Route, useHistory } from "react-router";
import { checkActive, getToken, isTeacher } from "../../api/Session";
import Unactive from "../../pages/Unactive";
import Navbar from "../Navbar";

function RouteForTeacher({ exact, path, type, component: Component, ...rest }) {
  const history = useHistory();
  return (
    <Route
      exact={exact}
      path={path}
      {...rest}
      render={(routeProps) => {
        return checkActive() ? (
          getToken() && isTeacher() ? (
            <>
              <Navbar />
              <Component {...routeProps} />
            </>
          ) : (
            history.goBack()
          )
        ) : (
          <Unactive />
        );
      }}
    />
  );
}

export default RouteForTeacher;
