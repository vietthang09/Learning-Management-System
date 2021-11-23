import React from "react";
import { enroll } from "../../api/API_Courses";
import { toast } from "react-toastify";

function EnrollButton(props) {
  return (
    <>
      <button
        className="px-3 py-2 bg-green-400 text-white font-medium rounded-lg hover:bg-green-500"
        onClick={(e) => {
          e.preventDefault();
          enroll(props.id);
          props.setRefresh(true);
        }}
      >
        Enroll
      </button>
    </>
  );
}

export default EnrollButton;
