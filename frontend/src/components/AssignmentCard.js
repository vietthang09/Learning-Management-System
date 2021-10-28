import React from "react";
import { ClockIcon, BookmarkIcon } from "@heroicons/react/outline";
function AssignmentCard(props) {
  return (
    <div className="p-2 mb-5 flex items-center bg-white border-r-2 border-green-400 rounded-lg shadow hover:shadow-md">
      <img
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt=""
        className="w-10 mr-3"
      />
      <div>
        <span className="block text-lg font-medium">{props.title}</span>
        <div className="flex">
          <div className="flex items-center text-xs text-gray-400 mr-2">
            <BookmarkIcon className="w-5 mr-1" />
            <span>{props.courseTitle}</span>
          </div>
          <div className="flex items-center text-xs font-bold text-gray-500">
            <ClockIcon className="w-5 mr-1" />
            <span>{props.deadline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentCard;
