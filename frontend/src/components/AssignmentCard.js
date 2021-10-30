import React, { Fragment, useState } from "react";
import { ClockIcon, BookmarkIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";

function AssignmentCard(props) {
  var today = new Date();
  var deadline = new Date(props.deadline);
  var options = { year: "numeric", month: "long", day: "numeric" };
  var dl = deadline.toLocaleDateString("en-US", options);
  let status = "border-green-400";
  if (today.getDate() > deadline.getDate()) {
    status = "border-red-400";
  }
  var model_HTML = "";
  var submit_HTML = "";
  if (props.full) {
    model_HTML = model(props);
    submit_HTML = submit();
  }
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function model(props) {
    return (
      <>
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          View Requirements
        </button>
      </>
    );
  }
  function submit() {
    return (
      <>
        <button>Submit</button>
      </>
    );
  }

  return (
    <>
      <div
        className={
          "p-2 mb-5 flex items-center bg-white border-r-2  rounded-lg shadow hover:shadow-md " +
          status
        }
      >
        <img
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt=""
          className="w-10 mr-3"
        />
        <div>
          <span className="block text-lg font-medium">{props.title}</span>
          <div className="flex mb-2">
            <div className="flex items-center text-xs text-gray-400 mr-2">
              <BookmarkIcon className="w-5 mr-1" />
              <span>{props.courseTitle}</span>
            </div>
            <div className="flex items-center text-xs font-bold text-gray-500">
              <ClockIcon className="w-5 mr-1" />
              <span>{dl}</span>
            </div>
          </div>
          <div>
            {model_HTML}
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
        {submit_HTML}
      </div>
    </>
  );
}

export default AssignmentCard;
