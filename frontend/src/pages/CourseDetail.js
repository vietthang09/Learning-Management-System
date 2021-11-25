import React from "react";
import { Tab } from "@headlessui/react";
import {
  AcademicCapIcon,
  BookOpenIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

import CourseInfo from "../components/CourseInfo";
import AssignmentList from "../components/lists/AssignmentList";
import { isTeacher } from "../api/Session";
import MaterialList from "../components/lists/MaterialList";

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
                    {isTeacher() && (
                      <Link
                        to={"/assignment/create/" + courseId}
                        className="p-2 mb-5 w-72 flex justify-center items-center bg-white text-gray-500 text-lg font-medium border-r-2 rounded-md shadow-md hover:shadow relative"
                      >
                        <PlusCircleIcon className="animate-pulse w-5 mr-2 text-green-400" />
                        New assignment
                      </Link>
                    )}
                    <AssignmentList id={courseId} />
                  </Tab.Panel>
                  <Tab.Panel className="mt-5 px-10">
                    {isTeacher() && (
                      <div className="flex justify-end">
                        <Link
                          to={"/material/create/" + courseId}
                          className="p-2 mb-5 w-72 flex justify-center items-center bg-white text-gray-500 text-lg font-medium border-r-2 rounded-md shadow-md hover:shadow relative"
                        >
                          <PlusCircleIcon className="animate-pulse w-5 mr-2 text-green-400" />
                          New material
                        </Link>
                      </div>
                    )}
                    <MaterialList id={courseId} />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <CourseInfo id={courseId} full={false} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetail;
