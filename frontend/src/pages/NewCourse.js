import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import EnrolledList from "../components/EnrolledList";
function NewCourse(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const courseId = props.match.params.id;
  var location = new useLocation();
  var history = useHistory();
  async function cancelRequest() {
    var formData = new FormData();
    formData.append("courseId", courseId);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/teacher/cancel-request",
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
  }
  async function enroll() {
    var formData = new FormData();
    formData.append("userId", user.id);
    formData.append("courseId", courseId);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/student/enroll",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }).then((response) => {
      if (response.data.status == 201) {
        toast.info("Done!");
      } else {
        toast.error("Something went wrong, please try again!");
      }
    });
  }
  async function getOut() {
    var formData = new FormData();
    formData.append("userId", user.id);
    formData.append("courseId", courseId);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/student/get-out",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }).then((response) => {
      if (response.data.status == 201) {
        toast.info("Done! Going to home page");
        setTimeout(() => {
          history.goBack();
        }, 3000);
      } else {
        toast.error("Something went wrong, please try again!");
      }
    });
  }
  const [enrollStatus, setEnrollStatus] = useState(false);
  async function checkEnroll() {
    var formData = new FormData();
    formData.append("userId", user.id);
    formData.append("courseId", courseId);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/student/check-enroll",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }).then((response) => {
      if (response.data.status == 1) {
        setEnrollStatus(true);
      } else if (response.data.status == 0) {
        setEnrollStatus(false);
      }
    });
  }
  useEffect(() => {
    if (user.role == 0) {
      checkEnroll();
    }
  }, []);

  return (
    <div>
      <div className="container m-auto mt-5">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-2/3 order-2 lg:order-1">
            <div className="p-5">
              <EnrolledList courseId={courseId} />
            </div>
          </div>
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <div className="p-3 shadow rounded-xl">
              <img
                src={"http://localhost:8000/" + location.state.cover}
                alt=""
                className="object-cover rounded-xl"
              />
              <div className="space-y-3">
                <p className="text-2xl font-bold text-gray-600">
                  {location.state.title}
                </p>
                <div className="flex items-center">
                  <img
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt=""
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <span className="text-gray-500 text-lg font-medium">
                    {location.state.teacherName}
                  </span>
                </div>
                <p className="text-gray-400">{location.state.introduction}</p>
              </div>
              <div className="flex justify-center ">
                {user.role == 0 ? (
                  enrollStatus ? (
                    <button
                      className="mt-5 mb-10 px-16 py-2 text-red-500 font-medium rounded-xl"
                      onClick={getOut}
                    >
                      Get out
                    </button>
                  ) : (
                    <button
                      className="mt-5 mb-10 px-16 py-2 text-green-500 font-medium bg-green-100 rounded-xl"
                      onClick={enroll}
                    >
                      Enroll
                    </button>
                  )
                ) : (
                  <button
                    className="mt-5 mb-10 px-16 py-2 text-red-500 font-medium rounded-xl"
                    onClick={cancelRequest}
                  >
                    Cancel request
                  </button>
                )}
              </div>
            </div>
          </div>
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

export default NewCourse;
