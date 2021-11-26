import React from "react";
import UserAvatar from "./UserAvatar";
import { UserGroupIcon } from "@heroicons/react/outline";
function NewCourseCard(props) {
  return (
    <div className="group bg-white">
      <div className="flex items-center p-2 rounded-lg shadow group-hover:shadow-sm">
        <UserAvatar link={props.data.teacherAvatar} />
        <div>
          <p
            title={props.data.courseTitle}
            className="text-gray-600 text-lg font-medium w-56 truncate"
          >
            {props.data.courseTitle}
          </p>
          <div>
            <div className="text-gray-500 font-medium text-sm">
              by {props.data.teacherName}
            </div>
            <div className="mt-2 flex text-gray-400 items-center text-xs">
              <UserGroupIcon className="w-5 mr-1" />
              {props.data.numberOfStudents} enrolled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCourseCard;
