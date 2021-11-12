import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
// import AssignmentCard from "../components/AssignmentCard";
import {
  AcademicCapIcon,
  BookOpenIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import MaterialCard from "../components/MaterialCard";
import axios from "axios";
import { Link, NavLink, useLocation } from "react-router-dom";

import CourseInfo from "../components/CourseInfo";
import AssignmentList from "../components/lists/AssignmentList";
import { isTeacher } from "../api/Session";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CourseDetail(props) {
  const courseId = props.match.params.id;

  return (
    <>
      <div className="container m-auto mt-5">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-2/3 order-2 lg:order-1">
            <div className="p-5">
              <Tab.Group>
                <Tab.List>
                  <div className="px-5 lg:px-10 flex justify-between">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "w-36 lg:w-72 py-2 bg-green-400 text-white font-semibold rounded-xl",
                          selected ? "opacity-100 shadow-lg" : "opacity-25"
                        )
                      }
                    >
                      <AcademicCapIcon className="w-10 m-auto" />
                      Assignments
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          "w-36 lg:w-72 py-2 bg-green-400 text-white font-semibold rounded-xl",
                          selected ? "opacity-100 shadow-lg" : "opacity-25"
                        )
                      }
                    >
                      <BookOpenIcon className="w-10 m-auto" />
                      Materials
                    </Tab>
                  </div>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel className="mt-5 px-10">
                    {isTeacher() ? (
                      <Link
                        to={"/assignment/create/" + courseId}
                        className="p-2 mb-5 w-72 flex justify-center items-center bg-white text-gray-500 text-lg font-medium border-r-2 rounded-md shadow-md hover:shadow relative"
                      >
                        <PlusCircleIcon className="animate-pulse w-5 mr-2 text-green-400" />
                        New assignment
                      </Link>
                    ) : (
                      ""
                    )}
                    <AssignmentList id={courseId} />
                  </Tab.Panel>
                  <Tab.Panel className="mt-5 px-10">
                    {/* {user.role == 0 ? (
                      ""
                    ) : (
                      <div className="flex justify-end">
                        <NavLink
                          to={{
                            pathname: "/create-material/" + courseId,
                            state: {
                              courseTitle: course.course_title,
                            },
                          }}
                          className="p-2 mb-5 w-72 flex justify-center items-center bg-white text-gray-500 text-lg font-medium border-r-2 rounded-md shadow-md hover:shadow relative"
                        >
                          <PlusCircleIcon className="animate-pulse w-5 mr-2 text-green-400" />
                          New material
                        </NavLink>
                      </div>
                    )} */}
                    {/* <div className={user.role == 0 ? "hidden" : ""}>
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
                                  Create a new material
                                </Dialog.Title>
                                <div className="mt-2">
                                  <div>
                                    <span>Title</span>
                                    <input
                                      type="text"
                                      name="title"
                                      className="border"
                                      onChange={onInputChange_Material}
                                    />
                                  </div>
                                  <div>
                                    <span>Content</span>
                                    <textarea
                                      name="content"
                                      className="border"
                                      onChange={onInputChange_Material}
                                    ></textarea>
                                  </div>
                                  <div>
                                    <span>File</span>
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
                                    className="bg-green-400 p-5 rounded-xl"
                                    onClick={confirm_Material}
                                  >
                                    Confirm
                                  </button>
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
                    </div> */}
                    {/* {materials_HTMLLIST} */}
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <CourseInfo id={courseId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetail;
