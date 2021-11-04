import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { SearchIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Link } from "react-router-dom";
const options = [{ option: "None" }, { option: "A-Z" }, { option: "Z-A" }];
function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/courses",
      headers: { "Content-Type": "application/json" },
      data: {
        userId: user.id,
      },
    }).then((res) => {
      if (res.status === 200) {
        setCourses(res.data.listOfCourses);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <img
          src="https://cdn.dribbble.com/users/2295279/screenshots/7195340/media/393b45e26e89ebf2effd9d6f41e91483.gif"
          alt=""
          className="w-96"
        />
      </div>
    );
  } else {
    var courses_HTMLLIST = "";
    courses_HTMLLIST = courses.map((item, index) => {
      return (
        <Link to={"/courses/" + item.course.course_id}>
          <CourseCard
            type="primary"
            data={item.course}
            numberOfStudents={item.numberOfStudents}
            numberOfMaterials={item.numberOfMaterials}
            numberOfAssignments={item.numberOfAssignments}
            teacherName={item.teacherName}
          />
        </Link>
      );
    });
  }
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
