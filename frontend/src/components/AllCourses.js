import React, { useState, useEffect } from "react";
import { getAllCourses, findCourse } from "../api/API_Courses";
import CourseCard from "./cards/CourseCard";
import { SearchIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";
function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [input, setinput] = useState();
  useEffect(() => {
    getCourses();
  }, [input]);
  function getCourses() {
    if (input) {
      findCourse(input, setCourses);
    } else {
      getAllCourses(setCourses);
    }
  }
  function handleInput(e) {
    setinput(e.target.value);
  }
  return (
    <div>
      <div className="mb-10 flex justify-between items-center">
        <div className="flex justify-between lg:w-96 p-2 bg-gray-100 rounded-md relative shadow-inner">
          <input
            type="text"
            className="w-full bg-gray-100 text-gray-500 focus:outline-none"
            placeholder="What course are you looking for?"
            onChange={(e) => handleInput(e)}
          />
          <button className="absolute -top-1/4 -right-2 p-4 bg-white border-2 border-green-400 rounded-full">
            <SearchIcon className="w-6 text-green-400 transform hover:scale-105" />
          </button>
        </div>
      </div>
      <div className="px-7 lg:px-2 grid grid-cols-1 lg:grid-cols-4 gap-10 gap-y-8">
        {courses.map((item, index) => {
          return (
            <NavLink to={"courses/" + item.course_id}>
              <CourseCard key={index} data={item} />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default AllCourses;
