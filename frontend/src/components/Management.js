import React from "react";
import { Link } from "react-router-dom";

function Management() {
  return (
    <div class="flex items-center justify-center">
      <div className="w-full">
        <div className="mb-5">
          <span className="text-gray-600 text-2xl font-bold">Management</span>
        </div>
        <div className="px-5 lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-2 gap-y-8">
          <Link
            to="m-students"
            className="p-7 rounded-lg shadow-md hover:bg-green-400 group"
          >
            <img
              src="./assets/img/icon/student.png"
              className="w-12 border-2 border-gray-600 group-hover:border-white rounded-full"
            />
            <span className="text-gray-600 text-3xl font-medium uppercase tracking-widest group-hover:text-white">
              Students
            </span>
          </Link>
          <Link
            to="m-teachers"
            className="p-7 rounded-lg shadow-md hover:bg-green-400 group"
          >
            <img
              src="./assets/img/icon/teacher.png"
              className="w-12 border-2 border-gray-600 group-hover:border-white rounded-full"
            />
            <span className="text-gray-600 text-3xl font-medium uppercase tracking-widest group-hover:text-white">
              Teachers
            </span>
          </Link>
          <Link
            to="m-courses"
            className="p-7 rounded-lg shadow-md hover:bg-green-400 group"
          >
            <img
              src="./assets/img/icon/courses.png"
              className="w-12 border-2 border-gray-600 group-hover:border-white rounded-full"
            />
            <span className="text-gray-600 text-3xl font-medium uppercase tracking-widest group-hover:text-white">
              Courses
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Management;
