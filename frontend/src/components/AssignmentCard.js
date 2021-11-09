import React, { Fragment, useEffect, useState } from "react";
import {
  FolderRemoveIcon,
  DownloadIcon,
  TrashIcon,
  AdjustmentsIcon,
} from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { NavLink } from "react-router-dom";
function AssignmentCard(props) {
  var [assignment, setAssignment] = useState([]);
  var [submission, setSubmission] = useState([]);
  var [submissionStatus, setSubmissionStatus] = useState();
  var [courseTitle, setCourseTitle] = useState();
  var [teacherAvatar, setTeacherAvatar] = useState();
  const [selectedFile, setSelectedFile] = useState();
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
      setTeacherAvatar(res.data.teacherAvatar);
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
      setSubmissionStatus(res.data.submissionStatus);
      setCourseTitle(res.data.course_title);
      setTeacherAvatar(res.data.teacherAvatar);
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
  async function handleSubmission(e) {
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
      }).then(() => {
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
  }

  async function handleDeletion(e) {
    const formData = new FormData();
    formData.append("submissionId", submissionId);
    await fetch("http://localhost:8000/api/student/submit/delete", {
      method: "POST",
      body: formData,
    }).then(() => {
      loadListForStudent();
      closeModal();
    });
  }

  return (
    <>
      <div
        className={
          "p-2 mb-5 flex justify-between items-center bg-white text-gray-600 border-r-2 rounded-md shadow hover:shadow-sm relative " +
          submissionStatus
        }
      >
        <div className="flex items-center">
          <img
            src={"http://localhost:8000/" + teacherAvatar}
            alt=""
            className="w-10 h-10 mr-3 object-cover rounded-full"
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
            {user.role == 1 ? (
              <NavLink
                to={{
                  pathname: "/update-assignment/" + assignment.id,
                  state: {
                    courseId: props.courseId,
                    courseTitle: courseTitle,
                    assignmentTitle: assignment.assignment_title,
                    assignmentContent: assignment.assignment_content,
                    assignmentDeadline: assignment.deadline,
                  },
                }}
              >
                <AdjustmentsIcon className="w-5" />
              </NavLink>
            ) : (
              <>
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
                      <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                      >
                        &#8203;
                      </span>
                      <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                          as="h3"
                          className="text-lg px-6 pt-6 font-medium leading-6 text-gray-600"
                        >
                          {assignment.assignment_title}
                        </Dialog.Title>
                        <div className="mt-2 divide-y divide-gray-200">
                          <p className="text-sm px-6 pb-6 text-gray-400">
                            {assignment.assignment_content}
                          </p>
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
                    </div>
                  </Dialog>
                </Transition>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default AssignmentCard;
