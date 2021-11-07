import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { SearchIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Link } from "react-router-dom";
function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  var URL = "http://127.0.0.1:8000/api/student/courses";
  if (user.role == 1) {
    URL = "http://127.0.0.1:8000/api/teacher/courses";
  }
  useEffect(() => {
    axios({
      method: "post",
      url: URL,
      headers: { "Content-Type": "application/json" },
      data: {
        userId: user.id,
      },
    }).then((res) => {
      if (res.status === 200) {
        setCourses(res.data.listOfCourses);
      }
    });
  }, []);

  var courses_HTMLLIST = "";
  courses_HTMLLIST = courses.map((item) => {
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
  function searchItems(searchValue) {
    setSearchInput(searchValue);
    let URL_SEARCH = "http://127.0.0.1:8000/api/student/courses/search";
    if (user.id == 1) {
      URL_SEARCH = "http://127.0.0.1:8000/api/teacher/courses/search";
    }
    axios({
      method: "post",
      url: URL_SEARCH,
      headers: { "Content-Type": "application/json" },
      data: {
        searchInput: searchInput,
        studentId: user.id,
      },
    }).then((res) => {
      if (res.status === 200) {
        setFilteredResults(res.data.listOfCourses);
      }
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
              onChange={(e) => searchItems(e.target.value)}
            />
            <button className="absolute -top-1/4 -right-2 p-4 bg-white border-2 border-green-400 rounded-full">
              <SearchIcon className="w-6 text-green-400 transform hover:scale-105" />
            </button>
          </div>
        </div>
        <div className="px-7 lg:px-2 grid grid-cols-1 lg:grid-cols-4 gap-10 gap-y-8">
          {/* {courses_HTMLLIST} */}
          {searchInput.length > 0
            ? filteredResults.map((item) => {
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
              })
            : courses.map((item) => {
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
              })}
        </div>
      </div>
    </div>
  );
}

export default Courses;
