import React, { useState } from "react";
import { createAssignment } from "../../api/API_Assignments";
import { toast } from "react-toastify";

function CreateAssignmentForm(props) {
  const [assignmentInfo, setAssignmentInfo] = useState({
    title: "",
    content: "",
    deadline: "",
  });

  function handleInput(e) {
    setAssignmentInfo({ ...assignmentInfo, [e.target.name]: [e.target.value] });
  }

  function confirm() {
    createAssignment(props.id, assignmentInfo);
    toast.info("Done!");
  }
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Title</label>
        <input
          type="text"
          className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          name="title"
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Content</label>
        <textarea
          className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          name="content"
          onChange={(e) => handleInput(e)}
        ></textarea>
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Deadline</label>
        <input
          type="date"
          className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          name="deadline"
          onChange={(e) => handleInput(e)}
        />
      </div>
      <button
        className="mt-5 p-2 w-full bg-green-400 text-white font-semibold rounded-md hover:bg-green-500"
        onClick={confirm}
      >
        Confirm
      </button>
    </div>
  );
}

export default CreateAssignmentForm;
