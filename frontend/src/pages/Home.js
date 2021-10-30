import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import CourseCard from "../components/CourseCard";
import AssignmentCard from "../components/AssignmentCard";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [numberToday, setNumberToday] = useState();
  const [newCourses, setNewCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/home").then((res) => {
      if (res.status === 200) {
        setCourses(res.data.collection);
        setNumberToday(res.data.countTodayAssigments);
        setAssignments(res.data.assignments);
        setNewCourses(res.data.newCourses);
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
    var courses_HTMLLIST = "";
    courses_HTMLLIST = courses.map((item, index) => {
      return (
        <Link to={"/courses/" + item.course.course_id}>
          <CourseCard
            type="primary"
            title={item.course.course_title}
            cover={item.course.course_cover}
            countAssginments={item.countAssignments}
            countStudents={item.countStudents}
            countMaterials={item.countMaterials}
            teacherName={item.teacherName}
          />
        </Link>
      );
    });

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

    var newCourses_HTMLLIST = "";
    if (newCourses.length == 0) {
      newCourses_HTMLLIST = (e) => {
        return <span>There are nothing :(</span>;
      };
    } else {
      newCourses_HTMLLIST = newCourses.map((item, index) => {
        return (
          <Link to={"/enroll/" + item.course.id}>
            <CourseCard
              type="enroll"
              title={item.course.course_title}
              cover={item.course.course_cover}
              countStudents={item.countStudents}
              teacherName={item.teacherName}
            />
          </Link>
        );
      });
    }

    var greeting = "";
    if (numberToday >= 1) {
      var temp = "";
      if (numberToday > 1) {
        temp = "s";
      }
      greeting = "You have " + numberToday + " assignment" + temp + " today";
    } else {
      greeting = "Wow, you don't have any assignment today";
    }
  }

  return (
    <div className="container m-auto mt-5">
      <div class="flex flex-wrap">
        <div className="w-full lg:w-3/4">
          <div className="px-2 mb-5 relative">
            <div class="p-5 bg-green-400 text-white flex items-center justify-start rounded-3xl shadow-lg">
              <div className="p-5">
                <h1 className="mb-5 text-4xl lg:text-5xl font-bold">
                  Hi Stark!
                </h1>
                <p className="text-xl lg:text-3xl font-normal opacity-80">
                  {greeting}
                </p>
                <p className="text-xl lg:text-3xl font-normal opacity-80">
                  Start your learning.
                </p>
              </div>
            </div>
            <div className="hidden lg:block absolute top-0 right-10">
              <img
                src="./assets/img/Learning-bro.svg"
                alt=""
                className="w-64"
              />
            </div>
          </div>
          <div className="px-2">
            <div class="h-full text-grey-dark flex items-center justify-center">
              <div>
                <div className="mb-10">
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
                <div className="lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-2 gap-y-8">
                  {courses_HTMLLIST}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/4 px-2 pb-2">
          <div class="text-sm text-grey-dark flex items-center">
            <div className="w-full">
              <div className="w-full h-72 flex justify-center items-center border">
                <span className="text-xl text-red-500">COMING SOON</span>
              </div>
              <div className="mt-3">
                <span className="text-lg font-medium">Up Comming</span>
                <div>{assignments_HTMLLIST}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <span className="text-gray-800 text-2xl font-bold">Enroll Now</span>
        <div className="mt-5 px-7 lg:px-0 grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-8">
          {newCourses_HTMLLIST}
        </div>
      </div>
    </div>
  );
}

export default Home;
