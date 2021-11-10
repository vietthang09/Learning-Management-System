import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getRecentlyCourses } from "../api/API_Courses";
import CourseCard from "./CourseCard";
function RecentlyVisited() {
  const [recentlyCourses, setRecentlyCourses] = useState([]);
  useEffect(() => {
    getRecentlyCourses(setRecentlyCourses);
  }, []);
  return (
    <div class="flex items-center justify-center">
      <div className="w-full">
        <div className="mb-5">
          <span className="text-gray-600 text-2xl font-bold">
            Recently visited
          </span>
        </div>
        <div className="px-5 lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-2 gap-y-8">
          {recentlyCourses.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={{
                  pathname: "/courses/" + item.course.course_id,
                  state: {
                    new: false,
                  },
                }}
              >
                <CourseCard
                  type="primary"
                  data={item.course}
                  numberOfStudents={item.numberOfStudents}
                  numberOfMaterials={item.numberOfMaterials}
                  numberOfAssignments={item.numberOfAssignments}
                  teacherName={item.teacherName}
                  teacherAvatar={item.teacherAvatar}
                />
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RecentlyVisited;
