import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import CourseCard from "../components/CourseCard";
import AssignmentCard from "../components/AssignmentCard";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Redirect, useHistory } from "react-router";
function Home() {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [numberToday, setNumberToday] = useState();
  const [newCourses, setNewCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  if (localStorage.getItem("token")) {
    <Redirect to="/login" />;
  }
  var URL = "http://127.0.0.1:8000/api/student/home";
  if (user.role == 1) {
    URL = "http://127.0.0.1:8000/api/teacher/home";
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
      if (res.status == 200) {
        setCourses(res.data.listOfCourses);
        setNewCourses(res.data.listOfNewCourses);
        setNumberToday(res.data.numberOfAssigmentsToday);
        setAssignments(res.data.listOfAssignments);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center"></div>
    );
  } else {
    var courses_HTMLLIST = "";
    courses_HTMLLIST = courses.map((item, index) => {
      return (
        <NavLink
          to={{
            pathname: "/courses/" + item.course.course_id,
            state: {
              new: false,
            },
          }}
        >
          <CourseCard
            type="primary"
            data={item.course}
            numberOfStudents={item.numberOfStudents}
            numberOfMaterials={item.numberOfMaterials}
            numberOfAssignments={item.numberOfAssignments}
            teacherName={item.teacherName}
          />
        </NavLink>
      );
    });

    var assignments_HTMLLIST = "";
    assignments_HTMLLIST = assignments.map((item) => {
      return (
        <Link to={"/courses/" + item.course_id}>
          <AssignmentCard type={false} id={item.id} />
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
          <NavLink
            to={{
              pathname: "/new/" + item.course.id,
              state: {
                cover: item.course.course_cover,
                title: item.course.course_title,
                teacherName: item.teacherName,
                introduction: item.course.introduction,
              },
            }}
          >
            <CourseCard
              type="enroll"
              data={item.course}
              numberOfStudents={item.numberOfStudents}
              teacherName={item.teacherName}
            />
          </NavLink>
        );
      });
    }

    var greeting = "No assignment today";
    if (user.role == 0) {
      greeting = "You have " + numberToday + " today";
    } else {
      greeting = "You have assigned " + numberToday + " today";
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
                  {"Hi " + user.name + " !"}
                </h1>
                <p className="text-xl lg:text-3xl font-normal opacity-80">
                  {greeting}
                </p>
                <p className="text-xl lg:text-3xl font-normal opacity-80">
                  Have a great day.
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
                  <span className="text-gray-800 text-2xl font-bold">
                    Recently visited
                  </span>
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
              <div className="mt-0">
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
          {user.role == 0 ? "" : <NavLink to="/new-course">New course</NavLink>}
          {newCourses_HTMLLIST}
        </div>
      </div>
    </div>
  );
}

export default Home;
