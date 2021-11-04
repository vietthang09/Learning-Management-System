import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import AssignmentCard from "../components/AssignmentCard";
import { AcademicCapIcon, BookOpenIcon } from "@heroicons/react/outline";
import MaterialCard from "../components/MaterialCard";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CourseDetail(props) {
  const [course, setCourse] = useState([]);
  const [teacher, setTeacher] = useState();
  const [materials, setMaterials] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    content: "",
    deadline: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));
  URL = "http://127.0.0.1:8000/api/student/course/";
  if (user.role == 1) {
    URL = "http://127.0.0.1:8000/api/teacher/course/";
  }
  const courseId = props.match.params.id;
  function loadData() {
    axios.get(URL + courseId).then((res) => {
      setCourse(res.data.courseInfo);
      setTeacher(res.data.teacher);
      setMaterials(res.data.materials);
      setAssignments(res.data.assignments);
    });
  }
  useEffect(() => {
    loadData();
  }, []);
  var materials_HTMLLIST = "";
  if (materials.length == 0) {
    materials_HTMLLIST = (e) => {
      return (
        <div className="flex justify-center items-center">
          <span className="text-green-400 font-medium text-lg">
            Hmm, The teacher has not provided any materials
          </span>
        </div>
      );
    };
  } else {
    materials_HTMLLIST = materials.map((item, index) => {
      return <MaterialCard data={item} />;
    });
  }
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onInputChange = (e) => {
    setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
  };

  function confirm() {
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/teacher/createassignment/",
      headers: { "Content-Type": "application/json" },
      data: {
        courseId: courseId,
        title: newAssignment.title,
        content: newAssignment.content,
        deadline: newAssignment.deadline,
      },
    }).then((res) => {
      closeModal();
      loadData();
    });
  }

  return (
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
                        "w-36 lg:w-72 py-2 bg-green-400 text-white rounded-xl",
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
                        "w-36 lg:w-72 py-2 bg-green-400 text-white rounded-xl",
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
                  <div className={user.role == 0 ? "hidden" : ""}>
                    <button
                      type="button"
                      onClick={openModal}
                      className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      New assignment
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
                                Create a new assignment
                              </Dialog.Title>
                              <div className="mt-2">
                                <div>
                                  <span>Title</span>
                                  <input
                                    type="text"
                                    name="title"
                                    className="border"
                                    onChange={onInputChange}
                                  />
                                </div>
                                <div>
                                  <span>Content</span>
                                  <input
                                    type="text"
                                    name="content"
                                    className="border"
                                    onChange={onInputChange}
                                  />
                                </div>
                                <div>
                                  <span>Deadline</span>
                                  <input
                                    type="date"
                                    name="deadline"
                                    className="border"
                                    onChange={onInputChange}
                                  />
                                </div>
                                <button
                                  className="bg-green-400 p-5 rounded-xl"
                                  onClick={confirm}
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
                  </div>
                  {assignments.map((item, index) => {
                    return <AssignmentCard type={true} id={item.id} />;
                  })}
                </Tab.Panel>
                <Tab.Panel className="mt-5 space-y-2">
                  {materials_HTMLLIST}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
        <div className="w-full lg:w-1/3 order-1 lg:order-2">
          <div className="p-3 shadow rounded-xl">
            <img
              src={"http://localhost:8000/" + course.course_cover}
              alt=""
              className="object-cover rounded-xl"
            />
            <div className="space-y-3">
              <p className="text-2xl font-bold text-gray-600">
                {course.course_title}
              </p>
              <div className="flex items-center">
                <img
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span className="text-gray-500 text-lg font-medium">
                  {teacher}
                </span>
              </div>
              <p className="text-gray-400">{course.introduction}</p>
            </div>
            <div className="flex justify-center">
              <a
                className="mt-5 mb-10 px-16 py-2 text-green-500 bg-green-100 rounded-xl"
                href={course.online_class_link}
              >
                Join online class
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
