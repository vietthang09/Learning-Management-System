import React from "react";
import {
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  FlagIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
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
    <Link to="/courses/course">
      <div className="relative group">
        <img
          src="https://cdn.tgdd.vn/hoi-dap/1216572/tri-tue-nhan-tao-ai-la-gi-cac-ung-dung-va-tiem-nan-11-800x450.jpg"
          alt=""
          className="h-auto w-full bg-cove rounded-3xl"
        />
        <div className="absolute -top-5 right-5 bg-green-400 text-white rounded-3xl">
          <div className="px-5 py-1">
            <div className="flex items-center">
              <span className="text-3xl mr-1">{props.countAssginments}</span>
              <AcademicCapIcon className="w-6 font-base" />
            </div>
            <span>Assignments</span>
          </div>
        </div>
        <div className="px-5 py-3 bg-white rounded-3xl shadow group-hover:shadow-md">
          <span className="text-lg font-medium">{props.title}</span>
          <div className="pt-4">
            <div className="flex items-center">
              <img
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
                className="w-8 mr-2"
              />
              <span className="text-base font-medium text-gray-500">
                {props.teacherName}
              </span>
            </div>
            <div className="flex items-center mt-2 text-xs">
              <div className="flex items-center text-gray-400 mr-5">
                <UserGroupIcon className="w-5 mr-1" />
                {props.countStudents} students
              </div>
              <div className="flex items-center text-gray-400">
                <BookOpenIcon className="w-5 mr-1" />
                {props.countMaterials} materials
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CourseCard_Enroll() {
  return (
    <Link to="/courses/course">
      <div className="relative group">
        <img
          src="https://cdn.tgdd.vn/hoi-dap/1216572/tri-tue-nhan-tao-ai-la-gi-cac-ung-dung-va-tiem-nan-11-800x450.jpg"
          alt=""
          className="h-auto w-full bg-cove rounded-3xl"
        />
        <div className="absolute -top-5 right-5 bg-red-400 text-white rounded-xl">
          <div className="px-7 py-1">
            <FlagIcon />
            <span>New</span>
          </div>
        </div>
        <div className="px-5 py-3 bg-white rounded-3xl shadow group-hover:shadow-md">
          <span className="text-lg font-medium">
            Lorem ipsum dolor sit amet.
          </span>
          <div className="pt-4">
            <div className="flex items-center">
              <img
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
                className="w-8 mr-2"
              />
              <span className="text-base font-medium text-gray-500">
                Lorem, ipsum.
              </span>
            </div>
            <div className="mt-2 flex items-center text-gray-400 text-sm">
              <UserGroupIcon className="w-5 mr-1" />
              64 students have enrolled
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
