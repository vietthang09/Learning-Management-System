import React, { useState, useEffect } from "react";
import NewCourseCard from "./NewCourseCard";
import { getNewCourses } from "../api/API_Courses";
import { getUser } from "../api/Session";
import { Link, NavLink } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/outline";
function NewCoursesList() {
  var [newCourses, setNewCourses] = useState([]);
  useEffect(() => {
    getNewCourses(setNewCourses);
  }, []);
  return (
    <div className="space-y-2">
      <span className="text-gray-600 text-2xl font-bold">
        {getUser().role == 0 ? "Enroll now" : "Waiting for approval"}
      </span>
      {getUser().role == 0 ? (
        ""
      ) : (
        <div className=" flex space-x-2 text-green-400 font-semibold">
          <NavLink
            to="/new-course"
            className="relative p-2 border border-green-400 rounded-lg hover:text-white hover:bg-green-400"
          >
            New course
            <PlusCircleIcon className="absolute top-0 -right-1 w-2 animate-ping" />
          </NavLink>
        </div>
      )}
      <div className="mt-5 lg:px-0 grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-8">
        {newCourses.map((item, index) => {
          return (
            <Link to={"/courses/new/" + item.id}>
              <NewCourseCard key={index} data={item} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default NewCoursesList;
