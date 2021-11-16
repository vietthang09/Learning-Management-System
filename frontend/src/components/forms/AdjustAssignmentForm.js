import React, { useState, useEffect } from "react";
import { getAssignmentInfo } from "../../api/API_Assignments";
import ConfirmButton from "../buttons/ConfirmButton";
import DeleteButton from "../buttons/DeleteButton";

function AdjustAssignmentForm(props) {
  var [assignmentInfo, setAssignmentInfo] = useState({
    assignmentTitle: "",
    assignmentContent: "",
    assignmentDeadline: "",
  });
  useEffect(() => {
    getAssignmentInfo(props.id, setAssignmentInfo);
  }, []);
  function handleInput(e) {
    setAssignmentInfo({ ...assignmentInfo, [e.target.name]: [e.target.value] });
  }
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Title</label>
        <input
          type="text"
          className="p-2 text-xl text-gray-600 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          name="assignmentTitle"
          defaultValue={assignmentInfo.assignmentTitle}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Content</label>
        <textarea
          className="p-2 text-xl text-gray-600 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          name="assignmentContent"
          defaultValue={assignmentInfo.assignmentContent}
          onChange={(e) => handleInput(e)}
        ></textarea>
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Deadline</label>
        <input
          type="date"
          className="p-2 text-xl text-gray-600 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          name="assignmentDeadline"
          defaultValue={assignmentInfo.assignmentDeadline}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className="flex justify-between items-center">
        <DeleteButton type="delete-assignment" id={props.id} />
        <ConfirmButton
          type="update-assignment"
          id={props.id}
          data={assignmentInfo}
        />
      </div>
    </div>
  );
}

export default AdjustAssignmentForm;
