import React, { useEffect } from "react";
import AssignmentCard from "../components/AssignmentCard";
import PostCard from "../components/PostCard";
import { PhotographIcon, DocumentIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import YouMayLikeCard from "../components/YouMayLikeCard";
import axios from "axios";
import { Link } from "react-router-dom";
function Forum() {
  const [isOpen, setIsOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/home").then((res) => {
      if (res.status === 200) {
        setAssignments(res.data.assignments);
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <img
          src="https://eshops.vn/assets/images/loading.gif"
          alt=""
          className="w-64"
        />
      </div>
    );
  } else {
    var assignments_HTMLLIST = "";
    assignments_HTMLLIST = assignments.map((item, index) => {
      return (
        <Link to={"/courses/" + item.course_id}>
          <AssignmentCard
            title={item.assignment_title}
            courseTitle={item.course_title}
            deadline={item.deadline}
          />
        </Link>
      );
    });
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="container m-auto mt-5">
      <div className="flex flex-wrap">
        <div className="hidden lg:block lg:w-1/4">
          <div className="p-2 sticky top-20 z-50">
            <span className="text-lg font-medium">You may like</span>
            <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-2">
              <YouMayLikeCard />
              <YouMayLikeCard />
              <YouMayLikeCard />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="px-1 lg:px-10">
            {/* Post Box */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-3 flex space-x-1 items-center">
                <img
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                  className="w-10 mr-5"
                />
                <button
                  type="text"
                  className="w-full h-10 px-5 text-left bg-gray-100 text-xl text-gray-400 outline-none rounded-3xl shadow-inner hover:bg-gray-200"
                  onClick={openModal}
                >
                  What's on your mind, Stark?
                </button>
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
                        className="text-lg text-center font-medium leading-6 text-gray-900"
                      >
                        Create post
                      </Dialog.Title>
                      <div className="mt-2">
                        <textarea
                          className="w-full outline-none resize-none text-lg text-gray-900"
                          placeholder="What's in your mind, Stark?"
                        ></textarea>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between items-center p-2 rounded-xl border">
                          <span className="text-sm text-gray-400 ">
                            Add to your Post
                          </span>
                          <div className="flex">
                            <PhotographIcon className="w-7 text-green-400" />
                            <DocumentIcon className="w-7 text-yellow-400" />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-400 border border-transparent rounded-md hover:bg-green-200"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-500 bg-green-100 border border-transparent rounded-md hover:bg-green-200"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
            {/* End Post Box */}

            {/* Post List */}
            <div>
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
            </div>
            {/* End Post List */}
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/4">
          <div className="px-2 sticky top-20 z-50">
            <span className="text-lg font-medium">Don't forgot</span>
            {assignments_HTMLLIST}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forum;
