import React, { useState, useEffect } from "react";
import NewCourseCard from "./NewCourseCard";
import { getNewCourses } from "../api/API_Courses";
import { isTeacher } from "../api/Session";
import { Link, NavLink } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/outline";
function NewCoursesList() {
  const [newCourses, setNewCourses] = useState([]);
  useEffect(() => {
    getNewCourses(setNewCourses);
  }, []);
  return (
    <div className="space-y-2">
      <span className="text-gray-600 text-2xl font-bold">
        {isTeacher() ? "Waiting for approval" : "Enroll now"}
      </span>
      {isTeacher() && (
        <div className=" flex space-x-2 text-green-400 font-semibold">
          <NavLink
            to="/new-course"
            className="relative p-2 bg-green-400 rounded-lg text-white hover:bg-green-500"
          >
            New course
            <PlusCircleIcon className="absolute top-0 -right-1 w-2 text-green-400 animate-ping" />
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
