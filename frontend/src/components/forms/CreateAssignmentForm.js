import React, { useState } from "react";
import { createAssignment } from "../../api/API_Assignments";
import LoadingButton from "../buttons/LoadingButton";
import ErrorText from "../ErrorText";
import { useHistory } from "react-router-dom";
function CreateAssignmentForm(props) {
  // States
  const history = useHistory();
  const [assignmentInfo, setAssignmentInfo] = useState({
    title: "",
    content: "",
    deadline: "",
  });
  const [errors, seterrors] = useState([]);
  const [loading, setloading] = useState(false);
  // End States

  // Funtions
  function handleInput(e) {
    setAssignmentInfo({ ...assignmentInfo, [e.target.name]: [e.target.value] });
  }

  function confirm() {
    createAssignment(props.id, assignmentInfo, setloading, seterrors, history);
  }
  function handlePress(e) {
    if (e.key === "Enter") {
      createAssignment(
        props.id,
        assignmentInfo,
        setloading,
        seterrors,
        history
      );
    }
  }
  // End funtions
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Title</label>
        <input
          type="text"
          className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          name="title"
          onChange={(e) => handleInput(e)}
          onKeyPress={handlePress}
        />
        {errors.title && <ErrorText text={errors.title} />}
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Content</label>
        <textarea
          className="p-2 h-44 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          name="content"
          onChange={(e) => handleInput(e)}
        ></textarea>
        {errors.content && <ErrorText text={errors.content} />}
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Deadline</label>
        <input
          type="date"
          className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          name="deadline"
          onChange={(e) => handleInput(e)}
          onKeyPress={handlePress}
        />
        {errors.deadline && <ErrorText text={errors.deadline} />}
      </div>
      {loading ? (
        <LoadingButton bg="bg-green-200" />
      ) : (
        <button
          className="mt-5 p-2 w-full bg-green-400 text-white font-semibold rounded-md focus:outline-none hover:bg-green-500"
          onClick={confirm}
        >
          Confirm
        </button>
      )}
    </div>
  );
}

export default CreateAssignmentForm;
