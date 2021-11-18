import React, { useState, useEffect } from "react";
import { getCourseInfo } from "../api/API_Courses";
import { getUser, isAdmin } from "../api/Session";
import CancleButton from "./buttons/CancleButton";
import UserAvatar from "./UserAvatar";
import ConfirmButton from "./buttons/ConfirmButton";
function CourseInfo(props) {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    getCourseInfo(props.id, setCourse);
  }, []);
  return (
    <div className="p-3 shadow rounded-xl bg-white">
      <img
        src={`http://localhost:8000/${course.courseCover}`}
        className="w-full h-full object-cover rounded-xl"
      />
      <div className="space-y-3">
        <p className="text-2xl font-bold text-gray-600">{course.courseTitle}</p>
        <div className="flex items-center">
          <UserAvatar link={course.teacherAvatar} />
          <span className="text-gray-500 text-lg font-medium">
            {course.teacherName}
          </span>
        </div>
        <p className="text-gray-400">{course.courseIntroduction}</p>
      </div>
      <div className="flex justify-center">
        {isAdmin() ? (
          <ConfirmButton type="confirm-course" id={props.id} />
        ) : getUser().id == course.teacherId ? (
          <CancleButton id={props.id} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CourseInfo;
