import React from "react";
import PostCard from "../components/PostCard";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Profile() {
  let history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/login");
  }
  return (
    <div className="container m-auto mt-5 px-24 divide-y">
      <div className="flex p-5 space-x-10">
        <img
          src={`http://localhost:8000/${user.avatar}`}
          className="w-40 h-40 object-cover rounded-full"
        />
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl text-gray-600 font-light">
              {user.name}
            </span>
            <Link
              to="/profile/edit"
              className="p-2 border rounded-lg text-sm text-gray-600 font-medium"
            >
              Edit Profile
            </Link>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-600">
              1<span className="font-normal"> posts</span>
            </p>
            <p className="font-medium text-gray-600">
              1<span className="font-normal"> courses</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="my-5 font-semibold text-xl lg:text-3xl text-gray-600 uppercase tracking-widest">
          posts
        </p>
      </div>
    </div>
  );
}

export default Profile;
