import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import EnrolledList from "../components/EnrolledList";
import { Dialog, Transition } from "@headlessui/react";

function NewCourse(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const courseId = props.match.params.id;
  var location = new useLocation();
  var history = useHistory();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
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
        closeModal();
        toast.info("Done! Going back to home page");
        setTimeout(() => {
          history.goBack();
        }, 3000);
      } else {
        toast.error("Please try again!");
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
                    className="mt-5 mb-10 px-16 py-2 text-red-500 font-medium rounded-xl hover:bg-red-400 hover:text-white"
                    onClick={openModal}
                  >
                    Cancel request
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Warning!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Confirm perform this action
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-400 rounded-md hover:bg-red-400 hover:text-white focus:outline-none "
                    onClick={(closeModal, cancelRequest)}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none"
                    onClick={closeModal}
                  >
                    No, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
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
