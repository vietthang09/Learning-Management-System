import React from "react";
import { updateAssignment } from "../../api/API_Assignments";
import { createSubmission, updateSubmission } from "../../api/API_Submissions";
import { createMaterial, updateMaterial } from "../../api/API_Materials";
import { updateProfile } from "../../api/API_User";
import { confirmCourse } from "../../api/API_Courses";

function ConfirmButton(props) {
  function confirm(e) {
    e.preventDefault();
    switch (props.type) {
      case "update-assignment":
        updateAssignment(props.id, props.data, props.setloading);
        break;
      case "create-submission":
        createSubmission(
          props.id,
          props.data,
          props.setLoading,
          props.setRefresh
        );
        props.setSelectedFile([]);
        break;
      case "update-submission":
        updateSubmission(
          props.id,
          props.data,
          props.setLoading,
          props.setRefresh
        );
        props.setSelectedFile([]);
        break;
      case "create-material":
        createMaterial(props.id, props.data, props.file);
        break;
      case "update-material":
        updateMaterial(props.id, props.data, props.file);
        break;
      case "update-profile":
        updateProfile(props.data, props.file);
        break;
      case "confirm-course":
        confirmCourse(props.id);
        break;
      default:
        break;
    }
  }
  return (
    <button
      className="p-2 bg-green-400 text-white font-semibold rounded-md hover:bg-green-500 focus:outline-none"
      onClick={(e) => confirm(e)}
    >
      Confirm
    </button>
  );
}

export default ConfirmButton;
