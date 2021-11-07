import React from "react";
import PostCard from "../components/PostCard";
import { useHistory } from "react-router";
function Profile() {
  let history = useHistory();
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/login");
  }
  return (
    <div className="container m-auto mt-5 px-24">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 px-10">
          <div className="sticky top-28 bg-white">
            <div className="flex justify-center items-center">
              <img
                src="https://i.pravatar.cc"
                alt=""
                className="w-56 rounded-full"
              />
            </div>
            <div>
              <label htmlFor="name">Full name:</label>
              <input type="text" id="name" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" />
            </div>
            <div>
              <label htmlFor="address">From:</label>
              <input type="text" id="address" />
            </div>
            <button className="px-5 py-2 text-green-500 bg-green-100 rounded-lg">
              Save
            </button>
            <button
              className="px-5 py-2 text-red-500 rounded-lg"
              onClick={logout}
            >
              Log out
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div>
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
