import React, { Fragment, useEffect, useState } from "react";
import {
  FolderRemoveIcon,
  DownloadIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useHistory } from "react-router";
function AssignmentCard(props) {
  const [assignment, setAssignment] = useState([]);
  const [submission, setSubmission] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState();
  const [courseTitle, setCourseTitle] = useState();
  const [numberOfSubmissions, setNumberOfSubmissions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState();
  const [updateAssignment, setUpdateAssignment] = useState({
    title: "",
    content: "",
    deadline: "",
  });
  let [isOpen, setIsOpen] = useState(false);
  let [label, setLabel] = useState("Choose a file");
  var submissionId = "";
  if (submission) submissionId = submission.id;
  var deadline = new Date(assignment.deadline);
  var deadlineToString = deadline.toLocaleDateString("en-US");
  const user = JSON.parse(localStorage.getItem("user"));

  function loadListForStudent() {
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/student/assignment/",
      headers: { "Content-Type": "application/json" },
      data: {
        assignmentId: props.id,
        userId: user.id,
      },
    }).then((res) => {
      setAssignment(res.data.assignment);
      setSubmission(res.data.submission);
      setSubmissionStatus(res.data.submissionStatus);
      setCourseTitle(res.data.course_title);
      setLoading(false);
    });
  }
  function loadListForTeacher() {
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/teacher/assignment/",
      headers: { "Content-Type": "application/json" },
      data: {
        assignmentId: props.id,
      },
    }).then((res) => {
      setAssignment(res.data.assignment);
      setNumberOfSubmissions(res.data.numberOfSubmissions);
      setSubmissionStatus(res.data.submissionStatus);
      setCourseTitle(res.data.course_title);
      setLoading(false);
    });
  }
  useEffect(() => {
    if (user.role == 1) loadListForTeacher();
    else loadListForStudent();
  }, []);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const handleSubmission = async (e) => {
    const thisClicked = e.currentTarget;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("assignment_id", props.id);
    formData.append("user_id", user.id);
    formData.append("fileName", selectedFile.name);
    formData.append("submissionId", submissionId);
    if (submissionStatus == "border-yellow-400") {
      thisClicked.innerText = "Uploading";
      await fetch("http://localhost:8000/api/student/submit/upload", {
        method: "POST",
        body: formData,
      }).then((result) => {
        loadListForStudent();
        thisClicked.innerText = "Update";
        closeModal();
      });
    }
    if (submissionStatus == "border-green-400") {
      thisClicked.innerText = "Updating";
      await fetch("http://localhost:8000/api/student/submit/update", {
        method: "POST",
        body: formData,
      }).then((result) => {
        loadListForStudent();
        thisClicked.innerText = "Update";
        closeModal();
      });
    }
  };

  const handleDeletion = async (e) => {
    const formData = new FormData();
    formData.append("submissionId", submissionId);
    await fetch("http://localhost:8000/api/student/submit/delete", {
      method: "POST",
      body: formData,
    }).then((result) => {
      loadListForStudent();
      closeModal();
    });
  };
  let history = useHistory();
  const deleteAssignment = async () => {
    const formData = new FormData();
    formData.append("assignmentId", assignment.id);
    await fetch("http://127.0.0.1:8000/api/teacher/assignment/delete", {
      method: "POST",
      body: formData,
    }).then((res) => {
      history.push("/");
      history.replace("/courses/" + props.courseId);
      closeModal();
    });
  };

  const onInputChange = (e) => {
    setUpdateAssignment({
      ...updateAssignment,
      [e.target.name]: e.target.value,
    });
  };

  const confirmUpdateAssignment = async () => {
    const formData = new FormData();
    formData.append("assignmentId", assignment.id);
    if (updateAssignment.title) {
      formData.append("title", updateAssignment.title);
    } else {
      formData.append("title", assignment.assignment_title);
    }
    if (updateAssignment.content) {
      formData.append("content", updateAssignment.content);
    } else {
      formData.append("content", assignment.assignment_content);
    }
    if (updateAssignment.deadline) {
      formData.append("deadline", updateAssignment.deadline);
    } else {
      formData.append("deadline", assignment.deadline);
    }
    await fetch("http://127.0.0.1:8000/api/teacher/assignment/update", {
      method: "POST",
      body: formData,
    }).then((res) => {
      loadListForTeacher();
      closeModal();
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center"></div>;
  } else {
    return (
      <>
        <div
          className={
            "p-2 mb-5 flex justify-between items-center bg-white text-gray-600 border-r-2 rounded-md shadow-md hover:shadow relative " +
            submissionStatus
          }
        >
          <div className="flex items-center">
            <img
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt=""
              className="w-10 h-10 mr-3 rounded-full"
            />
            <div>
              <span className="block text-lg text-gray-600 font-medium">
                {assignment.assignment_title}
              </span>
              <div className="mb-2 text-xs font-medium text-gray-400">
                <span className={props.type ? "hidden" : "block"}>
                  In: {courseTitle}
                </span>
                <span>Deadline: {deadlineToString}</span>
              </div>
            </div>
          </div>
          <div className={props.type ? "block flex space-x-10" : "hidden"}>
            <div>
              <button
                type="button"
                onClick={openModal}
                className="px-4 py-2 text-sm font-medium text-green-400 border border-green-400 rounded-lg"
              >
                View
              </button>
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
                      enter="ease-out duration-100"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-100"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                          as="h3"
                          className="text-lg px-6 pt-6 font-medium leading-6 text-gray-600"
                        >
                          {user.role == 1 ? (
                            <input
                              type="text"
                              className={user.role == 1 ? "" : "hidden"}
                              defaultValue={assignment.assignment_title}
                              name="title"
                              onChange={onInputChange}
                            />
                          ) : (
                            assignment.assignment_title
                          )}
                        </Dialog.Title>
                        <div className="mt-2 divide-y divide-gray-200">
                          {user.role == 1 ? (
                            <>
                              <textarea
                                className={user.role == 1 ? "" : "hidden"}
                                defaultValue={assignment.assignment_content}
                                name="content"
                                onChange={onInputChange}
                              ></textarea>
                              <input
                                type="date"
                                defaultValue={assignment.deadline}
                                onChange={onInputChange}
                                name="deadline"
                              />
                              <button
                                type="button"
                                className="flex items-center relative px-4 py-2 text-sm font-medium text-white bg-red-400 rounded-md bg-opacity-75 hover:bg-opacity-100 "
                                onClick={deleteAssignment}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                className="flex items-center relative px-4 py-2 text-sm font-medium text-white bg-green-400 rounded-md bg-opacity-75 hover:bg-opacity-100 "
                                onClick={confirmUpdateAssignment}
                              >
                                Update
                              </button>
                            </>
                          ) : (
                            <p className="text-sm px-6 pb-6 text-gray-400">
                              {assignment.assignment_content}
                            </p>
                          )}
                          {user.role == 1 ? (
                            <div>
                              <span>{numberOfSubmissions} submitted</span>
                              <button>View all</button>
                            </div>
                          ) : (
                            <div
                              className={
                                submissionStatus == "border-red-400"
                                  ? "hidden"
                                  : "block px-6 pt-5 space-y-4"
                              }
                            >
                              <div className="flex justify-between items-center">
                                <span className="truncate w-64 font-medium text-gray-600">
                                  {submission == null
                                    ? "Your submission will appear here"
                                    : submission.fileName}
                                </span>
                                <button
                                  className={
                                    submissionStatus == "border-yellow-400"
                                      ? "hidden"
                                      : "block w-20 py-2 text-sm font-medium text-white"
                                  }
                                  onClick={handleDeletion}
                                >
                                  <TrashIcon className="w-5 text-red-400 m-auto" />
                                </button>
                                <a
                                  className={
                                    submissionStatus == "border-yellow-400"
                                      ? "hidden"
                                      : "block w-20 py-2 text-sm font-medium text-white rounded-md border border-green-400 hover:bg-opacity-100"
                                  }
                                  href={
                                    submission == null
                                      ? ""
                                      : "http://127.0.0.1:8000/api/download/" +
                                        submission.id
                                  }
                                >
                                  <DownloadIcon className="w-5 text-green-400 m-auto" />
                                </a>
                              </div>
                              <div
                                className={
                                  submissionStatus == "border-red-400"
                                    ? "hidden"
                                    : "flex py-2 justify-between items-center"
                                }
                              >
                                <div className="w-56 flex truncate">
                                  <button
                                    className={
                                      label == "Choose a file"
                                        ? "hidden"
                                        : "flex items-center"
                                    }
                                    onClick={() => {
                                      setSelectedFile();
                                      setLabel("Choose a file");
                                    }}
                                  >
                                    <FolderRemoveIcon className="w-6 text-red-400" />
                                  </button>
                                  <input
                                    type="file"
                                    id="file"
                                    className="inputfile"
                                    onChange={(e) => {
                                      setLabel(e.target.files[0].name);
                                      setSelectedFile(e.target.files[0]);
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
                                  type="button"
                                  className={
                                    "flex items-center relative px-4 py-2 text-sm font-medium text-white bg-green-400 rounded-md bg-opacity-75 hover:bg-opacity-100 "
                                  }
                                  onClick={(e) => handleSubmission(e)}
                                >
                                  {submissionStatus == "border-yellow-400"
                                    ? " Submit"
                                    : " Update"}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 px-6 pb-6">
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-500 hover:text-red-400s focus:outline-none"
                            onClick={closeModal}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default AssignmentCard;
