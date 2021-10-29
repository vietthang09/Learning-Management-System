import React, { Fragment, useState, useEffect } from "react";
import { Disclosure, Tab } from "@headlessui/react";
import AssignmentCard from "../components/AssignmentCard";
import { ChevronRightIcon } from "@heroicons/react/outline";
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
  materials_HTMLLIST = materials.map((item, index) => {
    return (
      <MaterialCard
        title={item.material_title}
        content={item.material_content}
      />
    );
  });
  var assignments_HTMLLIST = "";
  assignments_HTMLLIST = assignments.map((item, index) => {
    return (
      <AssignmentCard
        title={item.assignment_title}
        courseTitle={item.course_title}
        deadline={item.deadline}
      />
    );
  });
  return (
    <div className="container  m-auto mt-5">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-2/3 order-2 lg:order-1">
          <div className="p-5">
            <Tab.Group>
              <Tab.List className="flex justify-between">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-32 py-2",
                      selected
                        ? "bg-green-400 text-white"
                        : "bg-white text-black"
                    )
                  }
                >
                  Materials
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-32 py-2",
                      selected
                        ? "bg-green-400 text-white"
                        : "bg-white text-black"
                    )
                  }
                >
                  Assignments
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel className="mt-5 space-y-2">
                  {materials_HTMLLIST}
                </Tab.Panel>
                <Tab.Panel className="mt-5">{assignments_HTMLLIST}</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
        <div className="w-full lg:w-1/3 order-1 lg:order-2">
          <div className="p-3 shadow">
            <img
              src={"http://127.0.0.1:3000/" + course.course_cover}
              alt={course.course_cover}
              className="object-cover rounded-xl"
            />
            <div className="mb-2">
              <p className="text-2xl font-bold">{course.course_title}</p>
              <p className="text-gray-700 text-lg font-medium">{teacher}</p>
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
