import React from "react";
import {
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
function CourseCard(props) {
  let temp;
  if (props.type === "primary") {
    temp = CourseCard_Primary(props);
  } else if (props.type === "enroll") {
    temp = CourseCard_Enroll(props);
  }
  return <>{temp}</>;
}

function CourseCard_Primary(props) {
  return (
    <div className="relative group">
      <img
        src={"http://localhost:8000/" + props.data.course_cover}
        alt=""
        className="h-44 w-full object-cover overflow-hidden rounded-3xl"
      />
      <div className="absolute -top-5 right-5 bg-green-400 text-white rounded-3xl">
        <div className="px-5 py-1">
          <div className="flex items-center">
            <span className="text-3xl mr-1">{props.numberOfAssignments}</span>
            <AcademicCapIcon className="w-6 font-base" />
          </div>
          <span className="font-medium">Assignments</span>
        </div>
      </div>
      <div className="px-5 py-3 bg-white rounded-3xl shadow group-hover:shadow-sm">
        <span className="text-gray-600 text-lg font-medium">
          {props.data.course_title}
        </span>
        <div className="pt-2">
          <div className="flex items-center">
            <img
              src={`http://localhost:8000/${props.teacherAvatar}`}
              className="w-10 h-10 mr-2 object-cover rounded-full shadow"
            />
            <span className="text-base font-medium text-gray-500">
              {props.teacherName}
            </span>
          </div>
          <div className="flex items-center mt-2 text-xs">
            <div className="flex items-center text-gray-400 mr-5">
              <UserGroupIcon className="w-5 mr-1" />
              {props.numberOfStudents} students
            </div>
            <div className="flex items-center text-gray-400">
              <BookOpenIcon className="w-5 mr-1" />
              {props.numberOfMaterials} materials
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard_Enroll(props) {
  return (
    <div className="group">
      <div className="flex items-center rounded-lg shadow group-hover:shadow-sm">
        <img
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt=""
          className="py-2 w-24 mr-2"
        />
        <div>
          <span className="text-gray-600 text-lg font-medium">
            {props.data.course_title}
          </span>
          <div>
            <div className="text-gray-500 font-medium text-sm">
              by {props.teacherName}
            </div>
            <div className="mt-2 flex text-gray-400 items-center text-xs">
              <UserGroupIcon className="w-5 mr-1" />
              {props.numberOfStudents}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
