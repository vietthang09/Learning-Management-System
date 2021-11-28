import React, { useState, useEffect } from "react";
import { getAssignmentInfo, updateAssignment } from "../../api/API_Assignments";
import ConfirmButton from "../buttons/ConfirmButton";
import DeleteButton from "../buttons/DeleteButton";
import LoadingButton from "../buttons/LoadingButton";
function AdjustAssignmentForm(props) {
  // States
  const [assignmentInfo, setAssignmentInfo] = useState({
    assignmentTitle: "",
    assignmentContent: "",
    assignmentDeadline: "",
  });
  const [loading, setloading] = useState(false);
  // End States

  // Functions
  useEffect(() => {
    getAssignmentInfo(props.id, setAssignmentInfo);
  }, []);

  function handleInput(e) {
    setAssignmentInfo({ ...assignmentInfo, [e.target.name]: [e.target.value] });
  }
  function handlePress(e) {
    if (e.key === "Enter") {
      updateAssignment(props.id, assignmentInfo, setloading);
    }
  }
  // End Functions
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
          onKeyPress={handlePress}
        />
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Content</label>
        <textarea
          className="p-2 h-44 text-xl text-gray-600 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
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
          onKeyPress={handlePress}
        />
      </div>
      <div className="flex justify-between items-center">
        <DeleteButton type="delete-assignment" id={props.id} />
        {loading ? (
          <LoadingButton width="w-16" />
        ) : (
          <ConfirmButton
            type="update-assignment"
            id={props.id}
            data={assignmentInfo}
            setloading={setloading}
          />
        )}
      </div>
    </div>
  );
}

export default AdjustAssignmentForm;
