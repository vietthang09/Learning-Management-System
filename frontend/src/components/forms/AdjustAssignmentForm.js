import moment from "moment";
import React, { useState, useEffect } from "react";
import { getAssignmentInfo } from "../../api/API_Assignments";
import DeleteButton from "../buttons/DeleteButton";

function AdjustAssignmentForm(props) {
  var [assignmentInfo, setAssignmentInfo] = useState({
    title: "",
    content: "",
    deadline: "",
  });
  useEffect(() => {
    getAssignmentInfo(props.id, setAssignmentInfo);
  }, []);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Title</label>
        <input
          type="text"
          className="p-2 text-xl text-gray-600 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          name="title"
          defaultValue={assignmentInfo.assignmentTitle}
        />
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Content</label>
        <textarea
          className="p-2 text-xl text-gray-600 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          name="content"
          defaultValue={assignmentInfo.assignmentContent}
        ></textarea>
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Deadline</label>
        <input
          type="date"
          className="p-2 text-xl text-gray-600 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          name="deadline"
          defaultValue={assignmentInfo.assignmentDeadline}
        />
      </div>
      <div className="flex justify-between items-center">
        <DeleteButton type="delete-assignment" id={props.id} />
        <button className="p-2  bg-green-400 text-white font-semibold rounded-md hover:bg-green-500">
          Confirm
        </button>
      </div>
    </div>
  );
}

export default AdjustAssignmentForm;
