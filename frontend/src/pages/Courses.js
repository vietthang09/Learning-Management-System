import React from "react";
import { isAdmin } from "../api/Session";
import AllCourses from "../components/AllCourses";
import NewCoursesList from "../components/lists/NewCoursesList";
function Courses() {
  return (
    <div className="container m-auto mt-5">
      {isAdmin() ? <NewCoursesList /> : <AllCourses />}
    </div>
  );
}

export default Courses;
