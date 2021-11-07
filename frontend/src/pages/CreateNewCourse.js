import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";

function CreateNewCourse() {
  var history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  var [file, setFile] = useState([]);
  const [fileName, setFileName] = useState("Choose a picture");
  async function confirm(e) {
    let thisClicked = e.currentTarget;
    thisClicked.innerText = "Loading";
    thisClicked.className += " opacity-50 animate-bounce";
    let formData = new FormData();
    formData.append("teacherId", user.id);
    let title = document.getElementById("title").value;
    let introduction = document.getElementById("introduction").value;
    if (!title || !introduction || !file) {
      toast.error("Please fill in all the information");
      thisClicked.innerText = "Request";
      thisClicked.className =
        "mt-10 p-2 block bg-green-400 text-white font-semibold rounded-md hover:bg-green-500";
    } else {
      formData.append("title", title);
      formData.append("introduction", introduction);
      formData.append("file", file);
      axios({
        method: "POST",
        url: "http://localhost:8000/api/teacher/create-course",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      }).then((response) => {
        if (response.data.status == 201) {
          thisClicked.innerText = "Done";
          thisClicked.className =
            "mt-10 p-2 block bg-green-400 text-white font-semibold rounded-md hover:bg-green-500";
          toast.info("Done! Going back to home page");
          setTimeout(() => {
            history.goBack();
          }, 2000);
        } else {
          thisClicked.innerText = "Request";
          thisClicked.className =
            "mt-10 p-2 block bg-green-400 text-white font-semibold rounded-md hover:bg-green-500";
          toast.error("Please try again!");
        }
      });
    }
  }

  return (
    <>
      <div className="container m-auto divide-y">
        <p className="my-10 font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest">
          NEW COURSE
        </p>
        <div className="py-5 flex space-x-10">
          <div className="flex-1">
            <p className="text-2xl text-gray-600">Basics</p>
            <span className="text-sm text-gray-400">
              Write a brief description <br /> to keep students interested in
              your course. <br />
              You can change this information later
            </span>
          </div>
          <div className="flex-2 space-y-3">
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
              <textarea
                type="text"
                className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                id="introduction"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="pt-5 flex space-x-10">
          <div className="flex-1">
            <div>
              <p className="text-2xl text-gray-600">Image</p>
              <span className="text-sm text-gray-400">
                Please upload a photo to describe your course. <br />
                You can change it later.
              </span>
            </div>
            <button
              className="mt-10 p-2 block bg-green-400 text-white font-semibold rounded-md hover:bg-green-500"
              id="confirm"
              onClick={(e) => {
                confirm(e);
              }}
            >
              Request
            </button>
          </div>
          <div className="flex-2">
            <div className="">
              <label className="block mb-5 text-sm text-gray-500">Cover</label>
              <label
                htmlFor="file"
                className="px-5 py-3 border border-green-400 text-green-400 font-semibold rounded-lg cursor-pointer"
              >
                {fileName}
              </label>
              <input
                type="file"
                className="hidden"
                id="file"
                accept="image/*"
                onChange={(e) => {
                  let url = URL.createObjectURL(e.target.files[0]);
                  let output = document.getElementById("output");
                  output.src = url;
                  setFile(e.target.files[0]);
                  setFileName(e.target.files[0].name);
                }}
              />
              <img
                id="output"
                className="my-5 w-72 h-36 object-cover border-2 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
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

export default CreateNewCourse;
