import React, { Fragment, useState } from "react";
import { ClockIcon, BookmarkIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";

function AssignmentCard_Normal(props) {}

function AssignmentCard(props) {
  var today = new Date();
  var deadline = new Date(props.deadline);
  var options = { year: "numeric", month: "long", day: "numeric" };
  var dl = deadline.toLocaleDateString("en-US", options);

  var submission = props.submission;
  var status = "border-yellow-400";
  var visibleSubmission = "block";

  if (today > deadline && submission == false) {
    status = "border-red-400";
    visibleSubmission = "hidden";
  }
  if (today >= deadline && submission == true) {
    status = "border-green-400";
  }
  if (today < deadline && submission == true) {
    status = "border-green-400";
  }
  if (today < deadline) {
    status = "border-yellow-400";
  }

  var visibleNormal = "block";
  var visibleFull = "hidden";
  if (props.type == "full") {
    visibleNormal = "hidden";
    visibleFull = "block";
  }

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        className={
          "p-2 mb-5 flex justify-between items-center bg-white border-r-2  rounded-lg shadow hover:shadow-md relative " +
          status
        }
      >
        <div className="flex items-center">
          <img
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt=""
            className="w-10 mr-3"
          />
          <div>
            <span className="block text-lg font-medium">{props.title}</span>
            <div className="flex mb-2">
              <div
                className={
                  "flex items-center text-xs text-gray-400 mr-2 " +
                  visibleNormal
                }
              >
                <BookmarkIcon className="w-5 mr-1" />
                <span>{props.courseTitle}</span>
              </div>
              <div className="flex items-center text-xs font-bold text-gray-500">
                <ClockIcon className="w-5 mr-1" />
                <span>{dl}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={visibleFull + " flex space-x-10"}>
          <div className={visibleSubmission}>
            <label
              htmlFor="file"
              className="px-4 py-2 text-sm font-medium text-green-400"
            >
              Choose file
            </label>
            <input type="file" className="hidden" id="file" />
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-green-400 rounded-md bg-opacity-75 hover:bg-opacity-100"
            >
              Submit
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={openModal}
              className="px-4 py-2 text-sm font-medium text-green-400 border border-green-400 rounded-lg"
            >
              Requirements
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
                        {props.title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{props.content}</p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
