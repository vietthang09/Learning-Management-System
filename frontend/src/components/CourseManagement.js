import { PlusCircleIcon, UserIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";

function CourseManagement() {
  return (
    <div class="mt-3 flex items-center justify-center">
      <div className="w-full">
        <div className="mb-5">
          <span className="text-gray-600 text-2xl font-bold">
            Course Management
          </span>
        </div>
        <div className="px-5 lg:px-0 grid grid-cols-1 lg:grid-cols-4 gap-2 gap-y-8">
          <Link
            to="/"
            className="p-10 flex justify-center items-center bg-green-400 rounded-lg hover:bg-green-500"
          >
            <UserIcon className="text-white w-7" />
            <span className="text-white text-3xl font-medium uppercase tracking-widest">
              List
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseManagement;
