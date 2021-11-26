import React from "react";
import { useHistory } from "react-router";
import { deleteAssignment } from "../../api/API_Assignments";
import { deleteMaterial } from "../../api/API_Materials";
import { deleteSubmission } from "../../api/API_Submissions";

function DeleteButton(props) {
  const history = useHistory();
  function confirm(e) {
    e.preventDefault();
    switch (props.type) {
      case "delete-assignment":
        deleteAssignment(props.id, props.setloading);
        break;
      case "delete-submission":
        deleteSubmission(props.id, props.setRefresh);
        break;
      case "delete-material":
        deleteMaterial(props.id);
        break;
      default:
        break;
    }
  }
  return (
    <button
      className="text-right text-red-400 font-semibold hover:text-red-500 focus:outline-none"
      onClick={(e) => confirm(e)}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
