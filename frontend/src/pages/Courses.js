import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { SearchIcon } from "@heroicons/react/outline";
import axios from "axios";
const options = [{ option: "None" }, { option: "A-Z" }, { option: "Z-A" }];
function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/courses").then((res) => {
      if (res.status === 200) {
        setCourses(res.data.courseList);
      }
    });
  }, []);

  var courses_HTMLLIST = "";
  courses_HTMLLIST = courses.map((item, index) => {
    return (
      <CourseCard
        type="primary"
        title={item.course_title}
        countAssginments={item.countAssignments}
        countStudents={item.countStudents}
        countMaterials={item.countMaterials}
        teacherName={item.teacherName}
      />
    );
  });
  return (
    <div>
      <div className="container m-auto mt-5">
        <div className="mb-10 flex justify-between items-center">
          <div className="flex justify-between lg:w-80 p-2 bg-gray-100 rounded-md relative shadow-inner">
            <input
              type="text"
              className="w-full bg-gray-100 text-gray-500 focus:outline-none"
              placeholder="What course are you looking for?"
            />
            <button className="absolute -top-1/4 -right-2 p-4 bg-white border-2 border-green-400 rounded-full">
              <SearchIcon className="w-6 text-green-400 transform hover:scale-105" />
            </button>
          </div>
        </div>
        <div className="px-7 lg:px-2 grid grid-cols-1 lg:grid-cols-4 gap-10 gap-y-8">
          {courses_HTMLLIST}
        </div>
      </div>
    </div>
  );
}

export default Courses;
