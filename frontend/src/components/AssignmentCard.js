import React, { Fragment, useEffect, useState } from "react";
import {
  ClockIcon,
  BookmarkIcon,
  DownloadIcon,
} from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
function AssignmentCard(props) {
  const history = useHistory();
  const [assignment, setAssignment] = useState([]);
  const [submission, setSubmission] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/assignment/" + props.id)
      .then((res) => {
        setAssignment(res.data.assignment);
        setSubmission(res.data.submission);
        setSubmissionStatus(res.data.submissionStatus);
      });
  }, []);
  const [selectedFile, setSelectedFile] = useState();

  var fP = props.fileName;
  var buttonStyle = "";

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmission = async (e) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("assignment_id", props.id);
    formData.append("user_id", 2);
    formData.append("fileName", selectedFile.name);
    formData.append("submissionId", submission.id);
    if (submissionStatus == "border-yellow-400") {
      await fetch("http://localhost:8000/api/submit/upload", {
        method: "POST",
        body: formData,
      }).then((result) => {});
    }
    if (submissionStatus == "border-green-400") {
      await fetch("http://localhost:8000/api/submit/update", {
        method: "POST",
        body: formData,
      }).then((result) => {});
    }
  };

  return (
    <>
      <div
        className={
          "p-2 mb-5 flex justify-between items-center bg-white border-r-2 rounded-lg shadow hover:shadow-md relative " +
          submissionStatus
        }
      >
        <div className="flex items-center">
          <img
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt=""
            className="w-10 mr-3"
          />
          <div>
            <span className="block text-lg font-medium">
              {assignment.assignment_title}
            </span>
            <div className="flex mb-2">
              <div className={"flex items-center text-xs text-gray-400 mr-2 "}>
                <BookmarkIcon className="w-5 mr-1" />
                <span>{assignment.assignment_title}</span>
              </div>
              <div className="flex items-center text-xs font-bold text-gray-500">
                <ClockIcon className="w-5 mr-1" />
                <span>{assignment.deadline}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={true ? "block flex space-x-10" : "hidden"}>
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
                        {assignment.assignment_title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {assignment.assignment_content}
                        </p>
                        <div
                          className={
                            submissionStatus == "border-red-400"
                              ? "hidden"
                              : "block flex items-center space-x-2"
                          }
                        >
                          <div>
                            <label
                              htmlFor="file"
                              id="label"
                              className="text-center w-60 text-sm truncate font-medium text-green-400"
                            >
                              {submission == null
                                ? "Choose file"
                                : submission.file_name}
                            </label>
                            <input
                              type="file"
                              className=""
                              id="file"
                              onChange={(e) => {
                                setSelectedFile(e.target.files[0]);
                              }}
                            />
                          </div>
                          <a
                            href={
                              submission == null
                                ? ""
                                : "http://127.0.0.1:8000/api/download/" +
                                  submission.id
                            }
                          >
                            <DownloadIcon className="w-5 text-green-400" />
                          </a>
                          <button
                            type="button"
                            className={
                              "relative px-4 py-2 text-sm font-medium text-white bg-green-400 rounded-md bg-opacity-75 hover:bg-opacity-100 " +
                              buttonStyle
                            }
                            onClick={handleSubmission}
                          >
                            {submissionStatus == "border-yellow-400"
                              ? "Submit"
                              : "Update"}
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                          onClick={closeModal}
                        >
                          Got it, thanks!
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
export default AssignmentCard;
