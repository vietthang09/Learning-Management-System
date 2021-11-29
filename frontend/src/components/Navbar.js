import React from "react";
import {
  HomeIcon,
  CollectionIcon,
  AcademicCapIcon,
  UserIcon,
  AdjustmentsIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { Link, NavLink } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { logout } from "../api/API_User";
import { useHistory } from "react-router";
import { getUser } from "../api/Session";
import UserAvatar from "./UserAvatar";
function Navbar() {
  const history = useHistory();
  function handleLogout() {
    logout();
    history.push("/login");
  }
  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="container m-auto">
        <div className="h-14 flex items-center justify-between">
          <div className="hidden lg:block">
            <Link to="/">
              <img
                src="http://localhost:3000/favicon.png"
                alt="logo"
                className="w-10"
              />
            </Link>
          </div>
          <div className="flex justify-center w-full lg:space-x-24 space-x-2">
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
            <Popover className="lg:hidden relative flex">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`${open ? "" : "text-opacity-90"}`}
                  >
                    <UserAvatar link={getUser().avatar} name={getUser().name} />
                  </Popover.Button>
                  <Popover.Panel className="absolute z-10 w-56 px-4 mt-3 transform top-7 -right-3">
                    <div className="bg-white space-y-5 p-3 shadow-xl rounded-xl">
                      <div>
                        <span className="block text-gray-500 font-medium">
                          Hi, {getUser().name}
                        </span>
                        <span className="text-gray-500 text-xs font-medium">
                          {getUser().role == 0
                            ? "Student"
                            : getUser().role == 1
                            ? "Teacher"
                            : "Admin"}
                        </span>
                      </div>
                      <div>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-10 group hover:bg-green-50 w-full p-2 rounded-lg"
                        >
                          <UserIcon className="w-5 text-gray-400 group-hover:text-green-400" />
                          <span className="text-gray-500 font-medium group-hover:text-green-400">
                            Profile
                          </span>
                        </Link>
                        <Link
                          to="/"
                          className="flex items-center space-x-10 group hover:bg-green-50 w-full p-2 rounded-lg"
                        >
                          <AdjustmentsIcon className="w-5 text-gray-400 group-hover:text-green-400" />
                          <span className="text-gray-500 font-medium group-hover:text-green-400">
                            Settings
                          </span>
                        </Link>
                        <button
                          className="flex items-center space-x-10 group hover:bg-red-50 w-full p-2 rounded-lg"
                          onClick={handleLogout}
                        >
                          <LogoutIcon className="w-5 text-gray-400 group-hover:text-red-400" />
                          <span className="text-gray-500 font-medium group-hover:text-red-400">
                            Logout
                          </span>
                        </button>
                      </div>
                    </div>
                  </Popover.Panel>
                </>
              )}
            </Popover>
          </div>
          <Popover className="hidden lg:block relative">
            {({ open }) => (
              <>
                <Popover.Button className={`${open ? "" : "text-opacity-90"}`}>
                  <UserAvatar link={getUser().avatar} name={getUser().name} />
                </Popover.Button>
                <Popover.Panel className="absolute z-10 w-56 px-4 mt-3 transform top-7 -right-3">
                  <div className="bg-white space-y-5 p-3 shadow-xl rounded-xl">
                    <div>
                      <span className="block text-gray-500 font-medium">
                        Hi, {getUser().name}
                      </span>
                      <span className="text-gray-500 text-xs font-medium">
                        {getUser().role == 0
                          ? "Student"
                          : getUser().role == 1
                          ? "Teacher"
                          : "Admin"}
                      </span>
                    </div>
                    <div>
                      <Link
                        to={`/profile/${getUser().id}`}
                        className="flex items-center space-x-10 group hover:bg-green-50 w-full p-2 rounded-lg"
                      >
                        <UserIcon className="w-5 text-gray-400 group-hover:text-green-400" />
                        <span className="text-gray-500 font-medium group-hover:text-green-400">
                          Profile
                        </span>
                      </Link>
                      <Link
                        to="/"
                        className="flex items-center space-x-10 group hover:bg-green-50 w-full p-2 rounded-lg"
                      >
                        <AdjustmentsIcon className="w-5 text-gray-400 group-hover:text-green-400" />
                        <span className="text-gray-500 font-medium group-hover:text-green-400">
                          Settings
                        </span>
                      </Link>
                      <button
                        className="flex items-center space-x-10 group hover:bg-red-50 w-full p-2 rounded-lg"
                        onClick={handleLogout}
                      >
                        <LogoutIcon className="w-5 text-gray-400 group-hover:text-red-400" />
                        <span className="text-gray-500 font-medium group-hover:text-red-400">
                          Logout
                        </span>
                      </button>
                    </div>
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
