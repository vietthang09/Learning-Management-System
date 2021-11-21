import React from "react";
import { cancelRequest } from "../../api/API_Courses";

function DeleteCourseButton(props) {
  function confirm(e) {
    e.preventDefault();
    cancelRequest(props.id);
    props.setRefresh(true);
  }
  return (
    <button
      className="text-right text-red-300 font-semibold hover:text-red-400"
      onClick={(e) => confirm(e)}
    >
      Delete
    </button>
  );
}

export default DeleteCourseButton;
