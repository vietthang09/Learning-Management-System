import React from "react";
import { cancelRequest } from "../../api/API_Courses";
function CancleButton(props) {
  return (
    <>
      <button
        className="px-3 py-2 bg-red-400 text-white font-medium rounded-lg hover:bg-red-500"
        onClick={(e) => {
          e.preventDefault();
          cancelRequest(props.id);
          props.setRefresh(true);
        }}
      >
        Cancel
      </button>
    </>
  );
}

export default CancleButton;
