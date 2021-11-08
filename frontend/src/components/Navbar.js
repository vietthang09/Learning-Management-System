import React from "react";
import {
  HomeIcon,
  CollectionIcon,
  AcademicCapIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { Link, NavLink } from "react-router-dom";
function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="container m-auto">
        <div className="h-14 flex justify-center lg:justify-between items-center ">
          <div className="hidden lg:block">
            <Link to="/">
              <img
                src="http://localhost:3000/favicon.png"
                alt="logo"
                className="w-10"
              />
            </Link>
          </div>
          <div className="flex lg:space-x-24 space-x-2">
            <NavLink
              to="/"
              exact="/"
              className="px-5 lg:px-10 py-1 rounded-lg hover:bg-gray-100"
            >
              <HomeIcon className="w-8 text-gray-500" />
            </NavLink>
            <NavLink
              to="/courses"
              className="px-5 lg:px-10 py-1 rounded-lg hover:bg-gray-100"
            >
              <CollectionIcon className="w-8 text-gray-500" />
            </NavLink>
            <NavLink
              to="/forum"
              className="px-5 lg:px-10 py-1 rounded-lg hover:bg-gray-100"
            >
              <AcademicCapIcon className="w-8 text-gray-500" />
            </NavLink>
          </div>
          <NavLink to="/profile">
            <img
              src={"http://localhost:8000/" + user.avatar}
              alt="logo"
              className="w-10 h-10 object-cover rounded-full"
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
