import React from "react";
import UserAvatar from "../UserAvatar";
import moment from "moment";
import { isStudent } from "../../api/Session";

function AssignmentCardMini(props) {
  const today = moment().format("YYYYMMDD");
  const deadline = moment(props.data.deadline).format("YYYYMMDD");
  function genrateBorder() {
    if (isStudent()) {
      if (today <= deadline && props.data.submission == 0) {
        return "border-yellow-400";
      } else if (today < deadline && props.data.submission == 1) {
        return "border-green-400";
      } else if (today >= deadline && props.data.submission == 1) {
        return "border-green-400";
      }
      return "border-red-400";
    } else {
      if (today <= deadline) {
        return "border-yellow-400";
      }
      return "border-green-400";
    }
  }
  return (
    <>
      <div
        className={
          "p-2 mb-5 flex justify-between items-center bg-white text-gray-600 border-r-2 rounded-md shadow hover:shadow-sm relative " +
          genrateBorder()
        }
      >
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <UserAvatar link={props.data.teacherAvatar} />
            <div>
              <span className="block text-lg text-gray-600 font-medium">
                {props.data.assignmentTitle}
              </span>
              <div className="mb-2 text-xs font-medium text-gray-400">
                <span className="block">In: {props.data.courseTitle}</span>
                <span>
                  Deadline: {moment(props.data.deadline).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AssignmentCardMini;
