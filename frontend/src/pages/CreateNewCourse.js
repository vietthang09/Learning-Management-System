import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";

function CreateNewCourse() {
  var history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const confirm = async () => {
    var formData = new FormData();
    formData.append("teacherId", user.id);
    formData.append("title", document.getElementById("title").value);
    formData.append(
      "introduction",
      document.getElementById("introduction").value
    );
    formData.append("file", document.getElementById("file").files[0]);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/teacher/create-course",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }).then((response) => {
      if (response.data.status == 201) {
        toast.info("Done! Going back to the home page");
        setTimeout(() => {
          history.goBack();
        }, 3000);
      } else {
        toast.error("Something went wrong, please try again!");
      }
    });
  };
  return (
    <div>
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Cover</label>
        <input
          type="file"
          className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          id="file"
        />
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Title</label>
        <input
          type="text"
          className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          id="title"
        />
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Introduction</label>
        <input
          type="text"
          className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          id="introduction"
        />
      </div>
      <button
        className="p-2 w-full bg-green-400 text-white font-semibold rounded-md hover:bg-green-500"
        id="confirm"
        onClick={confirm}
      >
        Request
      </button>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

export default CreateNewCourse;
