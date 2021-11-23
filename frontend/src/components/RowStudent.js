import React from "react";
import { isTeacher } from "../api/Session";
import UserAvatar from "./UserAvatar";

function RowStudent(props) {
  return (
    <tr>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">{props.index}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10">
            <UserAvatar link={props.data.studentAvatar} />
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">
              {props.data.studentName}
            </div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">{props.data.studentEmail}</div>
      </td>
    </tr>
  );
}

export default RowStudent;
