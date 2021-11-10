import React, { useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import RecentlyVisited from "../components/RecentlyVisited";
import Greeting from "../components/Greeting";
import Timeline from "../components/Timeline";
function Home() {
  const [newCourses, setNewCourses] = useState([]);
  // var newCourses_HTMLLIST = "";
  // if (newCourses.length == 0) {
  //   newCourses_HTMLLIST = (e) => {
  //     return <span>There are nothing :(</span>;
  //   };
  // } else {
  //   newCourses_HTMLLIST = newCourses.map((item, index) => {
  //     return (
  //       <NavLink
  //         to={{
  //           pathname: "/new/" + item.course.id,
  //           state: {
  //             cover: item.course.course_cover,
  //             title: item.course.course_title,
  //             teacherName: item.teacherName,
  //             teacherAvatar: item.teacherAvatar,
  //             introduction: item.course.introduction,
  //           },
  //         }}
  //       >
  //         <CourseCard
  //           type="enroll"
  //           data={item.course}
  //           numberOfStudents={item.numberOfStudents}
  //           teacherName={item.teacherName}
  //           teacherAvatar={item.teacherAvatar}
  //         />
  //       </NavLink>
  //     );
  //   });
  // }

  return (
    <div className="container m-auto mt-5">
      <div class="flex flex-wrap space-x-5">
        <div className="flex-none px-5 lg:px-0 lg:flex-3">
          <Greeting />
          <div>
            <RecentlyVisited />
          </div>
        </div>
        <div class="flex-none w-full px-5 lg:px-0 lg:flex-1 my-5 lg:my-0">
          <Timeline />
        </div>
      </div>
      <div className="my-5">
        <div className="space-y-2">
          {/* <span className="text-gray-600 text-2xl font-bold">
            {user.role == 0 ? "Enroll now" : "Waiting for approval"}
          </span>
          {user.role == 0 ? (
            ""
          ) : (
            <div className=" flex space-x-2 text-green-400 font-semibold">
              <NavLink
                to="/new-course"
                className="relative p-2 border border-green-400 rounded-lg hover:text-white hover:bg-green-400"
              >
                New course
                <PlusCircleIcon className="absolute top-0 -right-1 w-2 animate-ping" />
              </NavLink>
            </div>
          )} */}
        </div>
        <div className="mt-5 lg:px-0 grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-8">
          {/* {newCourses_HTMLLIST} */}
        </div>
      </div>
    </div>
  );
}

export default Home;
