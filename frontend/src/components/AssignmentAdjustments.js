import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DownloadIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
function AssignmentAdjustments(props) {
  const assignmentId = props.match.params.id;
  var [submissions, setSubmissions] = useState([]);
  var location = useLocation();
  var history = useHistory();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const confirm = async () => {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let deadline = document.getElementById("deadline").value;
    if (!title || !content || !deadline) {
      toast.error("Please fill in all the information");
    } else {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/teacher/assignment/update",
        headers: { "Content-Type": "application/json" },
        data: {
          assignmentId: assignmentId,
          title: title,
          content: content,
          deadline: deadline,
        },
      }).then((response) => {
        if (response.data.status == 201) {
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

  const deleteAssignment = async (e) => {
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/teacher/assignment/delete",
      headers: { "Content-Type": "application/json" },
      data: {
        assignmentId: assignmentId,
      },
    }).then((response) => {
      if (response.data.status == 201) {
        toast.info("Done! Going back to the course");
        setTimeout(() => {
          history.push("/");
          history.replace("/courses/" + location.state.courseId);
        }, 3000);
      } else {
        toast.error("Something went wrong, please try again!");
      }
    });
  };

  const loadSubmissions = async (e) => {
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/teacher/assignment/submissions",
      headers: { "Content-Type": "application/json" },
      data: {
        assignmentId: assignmentId,
      },
    }).then((response) => {
      console.log(response.data.submissions);
      if (response.data.status == 201) {
        setSubmissions(response.data.submissions);
      } else {
        toast.error("Something went wrong, please try again!");
      }
    });
  };
  useEffect(() => {
    loadSubmissions();
  }, []);
  const giveMark = async (e, submissionId) => {
    if (e.target.value > 10 || e.target.value < 0) {
      toast.error("Invalid mark!");
    } else {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/teacher/assignment/give-mark",
        headers: { "Content-Type": "application/json" },
        data: {
          submissionId: submissionId,
          mark: e.target.value,
        },
      }).then((response) => {
        if (response.data.status == 201) {
          var saved = document.getElementById("saved");
          saved.innerText = "Saved";
          setTimeout(() => {
            saved.innerText = "";
          }, 2000);
        } else {
          toast.error("Something went wrong, please try again!");
        }
      });
    }
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-full lg:w-1/2 px-5 lg:px-0">
          <div className="flex justify-between items-center py-10">
            <p className="font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest">
              UPDATE ASSIGNMENT
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
                className="p-2 text-xl text-gray-600 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                name="title"
                id="title"
                defaultValue={location.state.assignmentTitle}
              />
            </div>
            <div className="grid grid-cols-1 gap-1">
              <label className="text-sm text-gray-500">Content</label>
              <textarea
                className="p-2 text-xl text-gray-600 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                name="content"
                id="content"
                defaultValue={location.state.assignmentContent}
              ></textarea>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <label className="text-sm text-gray-500">Deadline</label>
              <input
                type="date"
                className="p-2 text-xl text-gray-600 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                name="deadline"
                id="deadline"
                defaultValue={location.state.assignmentDeadline}
              />
            </div>
            <div className="grid grid-cols-1 gap-1">
              <button
                className="mt-5 p-2 w-full bg-green-400 text-white font-semibold rounded-md hover:bg-green-500"
                onClick={confirm}
              >
                Confirm
              </button>
              <button
                className="p-2 w-full text-right text-red-400 font-semibold"
                onClick={openModal}
              >
                Delete
              </button>
            </div>
            <div className="py-5 flex justify-between items-center">
              <p className="px-5 lg:px-0 font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest">
                SUBMISSIONS
              </p>
              <span className="text-gray-600 font-semibold">
                Quantity: {submissions ? submissions.length : 0}
              </span>
            </div>
            <div className="hidden lg:block">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Submissions
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Submitted at
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Mark
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submissions.map((item) => {
                    return (
                      <tr className="bg-emerald-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex justify-between items-center">
                          {item.fileName}
                          <a
                            href={
                              "http://127.0.0.1:8000/api/download/" + item.id
                            }
                          >
                            <DownloadIcon className="w-5" />
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.created_at}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            className="w-16 focus:outline-none focus:ring-2 focus:ring-green-400"
                            defaultValue={item.mark}
                            onChange={(e) => giveMark(e, item.id)}
                          />
                          <span
                            id="saved"
                            className="text-gray-400 font-medium"
                          ></span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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

            {/* This element is to trick the browser into centering the modal contents. */}
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
                  className="text-lg font-medium leading-6 text-yellow-400"
                >
                  Warning !
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    All student work will be lost, do you still want to
                    continue?
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-400 "
                    onClick={(closeModal, deleteAssignment)}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-400 bg-green-100 border border-transparent rounded-md"
                    onClick={closeModal}
                  >
                    Cancel
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
    </>
  );
}

export default AssignmentAdjustments;
