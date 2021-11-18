import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getNewCourses } from "../../api/API_Courses";
import NewCourseCard from "../NewCourseCard";
function NewCoursesList() {
  var [courses, setCourses] = useState([]);
  useEffect(() => {
    getNewCourses(setCourses);
  }, []);
  return (
    <div className="mt-5 lg:px-0 grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-8">
      {courses.map((item, index) => {
        return (
          <Link to={"/courses/new/" + item.id}>
            <NewCourseCard data={item} />
          </Link>
        );
      })}
    </div>
  );
}

export default NewCoursesList;
