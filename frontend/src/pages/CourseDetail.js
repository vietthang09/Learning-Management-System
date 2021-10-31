import React, { Fragment, useState, useEffect } from "react";
import { Disclosure, Tab } from "@headlessui/react";
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
  useEffect(() => {
    const courseId = props.match.params.id;
    axios.get("http://127.0.0.1:8000/api/courses/" + courseId).then((res) => {
      if (res.data.status === 200) {
        setCourse(res.data.course);
        setTeacher(res.data.teacher);
        setMaterials(res.data.materials);
        setAssignments(res.data.assignments);
      }
    });
  }, []);
  var materials_HTMLLIST = "";
  if (materials.length == 0) {
    materials_HTMLLIST = (e) => {
      return (
        <div className="flex justify-center items-center">
          <span>Hmm, The teacher has not provided any materials</span>
        </div>
      );
    };
  } else {
    materials_HTMLLIST = materials.map((item, index) => {
      return (
        <MaterialCard
          title={item.material_title}
          content={item.material_content}
          link={item.file_link}
        />
      );
    });
  }

  var assignments_HTMLLIST = "";
  if (assignments.length == 0) {
    assignments_HTMLLIST = (e) => {
      return (
        <div className="flex justify-center items-center">
          <span>Hmm, The teacher hasn't assigned any assignment yet</span>
        </div>
      );
    };
  } else {
    assignments_HTMLLIST = assignments.map((item, index) => {
      var submited = false;
      var fileName = "Choose file";
      var submissionId = "";
      var filePath = "";
      if (item.submission) {
        submited = true;
        fileName = item.submission["file_name"];
        submissionId = item.submission["id"];
        filePath = item.submission["file_path"];
      }
      return (
        <AssignmentCard
          type="full"
          id={item.assignment.id}
          userId={2}
          title={item.assignment.assignment_title}
          content={item.assignment.assignment_content}
          deadline={item.assignment.deadline}
          fileName={fileName}
          filePath={filePath}
          submission={submited}
          submissionId={submissionId}
        />
      );
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
                <Tab.Panel className="mt-5">{assignments_HTMLLIST}</Tab.Panel>
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
            <div className="mb-2">
              <p className="text-2xl font-bold">{course.course_title}</p>
              <div className="flex">
                <img
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                  className="w-8 mr-2"
                />
                <p className="text-gray-700 text-lg font-medium">{teacher}</p>
              </div>
              <p className="text-gray-500">{course.introduction}</p>
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
