import React from "react";
import {
  HomeIcon,
  CollectionIcon,
  AcademicCapIcon,
  UserIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { Link, NavLink } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { logout } from "../api/API_User";
import { useHistory } from "react-router";
function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  function handleProfile() {
    history.push("/profile");
  }
  function handleLogout() {
    logout();
    history.push("/login");
  }
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
          <Popover className="relative flex">
            {({ open }) => (
              <>
                <Popover.Button className={`${open ? "" : "text-opacity-90"}`}>
                  <img
                    src={"http://localhost:8000/" + user.avatar}
                    alt="logo"
                    className="w-10 h-10 object-cover rounded-full shadow"
                  />
                </Popover.Button>
                <Popover.Panel className="absolute z-10 w-48 px-4 mt-3 transform top-7 -right-3">
                  <div className="bg-white p-3 space-y-5 shadow-xl rounded-xl">
                    <button
                      className="flex items-center space-x-10 group"
                      onClick={handleProfile}
                    >
                      <UserIcon className="w-5 text-gray-400 group-hover:text-green-400" />
                      <span className="text-gray-500 font-medium group-hover:text-green-400">
                        Profile
                      </span>
                    </button>
                    <button
                      className="flex items-center space-x-10 group"
                      onClick={handleLogout}
                    >
                      <LogoutIcon className="w-5 text-gray-400 group-hover:text-red-400" />
                      <span className="text-gray-500 font-medium group-hover:text-red-400">
                        Logout
                      </span>
                    </button>
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
