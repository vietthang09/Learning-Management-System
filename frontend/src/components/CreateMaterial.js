import axios from "axios";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateMaterial(props) {
  const courseId = props.match.params.id;
  var location = useLocation();
  var history = useHistory();
  let [label, setLabel] = useState("Choose a file");
  const confirm = async (e) => {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let file = document.getElementById("file").files[0];
    if (!title || !content || !file) {
      toast.error("Please fill in all the information");
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("courseId", courseId);
      formData.append("fileName", file.name);
      formData.append("title", title);
      formData.append("content", content);
      await fetch("http://localhost:8000/api/teacher/material/creatematerial", {
        method: "POST",
        body: formData,
      }).then((response) => {
        if (response.status == 200) {
          toast.info("Done! Going back to the course");
          setTimeout(() => {
            history.goBack();
          }, 3000);
        } else {
          toast.error("Something went wrong, please try again!");
        }
      });
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-full lg:w-1/2 px-5 lg:px-0">
        <div className="flex justify-between items-center py-10">
          <p className="font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest">
            NEW MATERIAL
          </p>
          <button
            className="text-gray-600 font-semibold"
            onClick={() => {
              history.goBack();
            }}
          >
            in {location.state.courseTitle}
          </button>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Title</label>
            <input
              type="text"
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="title"
              id="title"
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Content</label>
            <textarea
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="content"
              id="content"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">File</label>
            <input
              type="file"
              id="file"
              className="inputfile"
              onChange={(e) => {
                setLabel(e.target.files[0].name);
                // setSelectedFile(e.target.files[0]);
              }}
            />
            <label
              htmlFor="file"
              id="label"
              className="py-2 font-medium text-green-400"
            >
              {label}
            </label>
          </div>
          <button
            className="mt-5 p-2 w-full bg-green-400 text-white font-semibold rounded-md hover:bg-green-500"
            onClick={confirm}
          >
            Confirm
          </button>
        </div>
      </div>
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

export default CreateMaterial;
