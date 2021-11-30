import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { countOfUser } from "../api/API_Forum";
import { countOfUser as countOfUser_Courses } from "../api/API_Courses";
import { getUser } from "../api/Session";
import OwnPostList from "../components/lists/OwnPostList";
import { getUserById } from "../api/API_User";
function Profile(props) {
  const [user, setUser] = useState([]);
  const userId = props.match.params.id;
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfCourses, setNumberOfCourses] = useState(0);
  useEffect(() => {
    getUserById(userId, setUser);
    countOfUser(userId, setNumberOfPosts);
    countOfUser_Courses(userId, setNumberOfCourses);
  }, []);
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
            {userId == getUser().id && (
              <Link
                to="/me/edit"
                className="p-2 border rounded-lg text-sm text-gray-600 font-medium"
              >
                Edit Profile
              </Link>
            )}
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-600">
              {numberOfPosts}
              <span className="font-normal"> posts</span>
            </p>
            <p className="font-medium text-gray-600">
              {numberOfCourses}
              <span className="font-normal"> courses</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="my-5 font-semibold text-xl lg:text-3xl text-gray-600 uppercase tracking-widest">
          posts
        </p>
        <OwnPostList id={userId} />
      </div>
    </div>
  );
}

export default Profile;
