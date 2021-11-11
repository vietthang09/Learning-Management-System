import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import { createCourse } from "../../api/API_Courses";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CreateCourseForm() {
  var [courseInfo, setCourseInfo] = useState({
    title: "",
    introduction: "",
  });
  const [seletedImage, setSelectedImage] = useState([]);
  function handleInput(e) {
    setCourseInfo({ ...courseInfo, [e.target.name]: [e.target.value] });
  }
  function confirm() {
    createCourse(courseInfo, seletedImage);
    toast.info("Done!");
  }
  return (
    <div>
      <p className="my-10 font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest">
        NEW COURSE
      </p>
      <div className="py-5 flex space-x-10">
        <div className="flex-1">
          <p className="text-2xl text-gray-600">Basics</p>
          <span className="text-sm text-gray-400">
            Write a brief description <br /> to keep students interested in your
            course. <br />
            You can change this information later
          </span>
        </div>
        <div className="flex-2 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Title</label>
            <input
              type="text"
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="title"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Introduction</label>
            <textarea
              type="text"
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="introduction"
              onChange={(e) => handleInput(e)}
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
              {seletedImage.name ? seletedImage.name : "Choose file"}
            </label>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              id="file"
              name="file"
              onChange={(e) => {
                setSelectedImage(e.target.files[0]);
              }}
            />
            {seletedImage.name ? (
              <div className="relative w-72 h-36">
                <img
                  src={URL.createObjectURL(seletedImage)}
                  className="my-5 w-full h-full object-cover border-2 rounded-lg"
                />
                <TrashIcon
                  className="absolute top-0 right-0 w-5 text-red-400"
                  onClickCapture={(e) => {
                    e.preventDefault();
                    setSelectedImage([]);
                  }}
                />
              </div>
            ) : (
              ""
            )}
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
    </div>
  );
}

export default CreateCourseForm;
