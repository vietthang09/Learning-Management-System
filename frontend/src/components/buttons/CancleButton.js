import React from "react";
import { cancelRequest } from "../../api/API_Courses";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CancleButton(props) {
  return (
    <>
      <button
        className="px-3 py-2 bg-red-400 text-white font-medium rounded-lg hover:bg-red-500"
        onClick={(e) => {
          e.preventDefault();
          cancelRequest(props.id);
          toast.info("Done!");
        }}
      >
        Cancel
      </button>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
      />
    </>
  );
}

export default CancleButton;
