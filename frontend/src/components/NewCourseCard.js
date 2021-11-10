import React, { useState, useEffect } from "react";
import UserAvatar from "./UserAvatar";
import { UserGroupIcon } from "@heroicons/react/outline";
import { getNumberEnrolled } from "../api/API_Courses";
function NewCourseCard(props) {
  var [numberEnrolled, setNumberEnrolled] = useState([]);
  useEffect(() => {
    getNumberEnrolled(props.id, setNumberEnrolled);
  }, []);
  return (
    <div className="group bg-white">
      <div className="flex items-center p-2 rounded-lg shadow group-hover:shadow-sm">
        <UserAvatar link={props.teacherAvatar} />
        <div>
          <span className="text-gray-600 text-lg font-medium">
            {props.title}
          </span>
          <div>
            <div className="text-gray-500 font-medium text-sm">
              by {props.teacherName}
            </div>
            <div className="mt-2 flex text-gray-400 items-center text-xs">
              <UserGroupIcon className="w-5 mr-1" />
              {numberEnrolled} enrolled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCourseCard;
