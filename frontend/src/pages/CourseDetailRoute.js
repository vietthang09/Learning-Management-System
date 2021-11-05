import React from "react";

function CourseDetailRoute() {
  return (
    <div>
      <NavLink exact to={"/courses/3/assignment"}>
        Assignment
      </NavLink>
      <Router>
        <Switch>
          <Route
            exact
            path={"/courses/3/assignment" + courseId}
            component={AssignmentList}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default CourseDetailRoute;
