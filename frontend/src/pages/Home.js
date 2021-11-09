import React, { useEffect, useState } from "react";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
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
        console.log(res.data.listOfNewCourses);
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
            teacherAvatar={item.teacherAvatar}
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
                teacherAvatar: item.teacherAvatar,
                introduction: item.course.introduction,
              },
            }}
          >
            <CourseCard
              type="enroll"
              data={item.course}
              numberOfStudents={item.numberOfStudents}
              teacherName={item.teacherName}
              teacherAvatar={item.teacherAvatar}
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
      <div class="flex flex-wrap space-x-5">
        <div className="flex-none px-5 lg:px-0 lg:flex-3">
          <div className="mb-5 relative">
            <div class="p-5 bg-green-400 text-white flex items-center justify-start rounded-3xl shadow-lg">
              <div className="p-5">
                <h1 className="mb-5 text-4xl lg:text-5xl font-bold">
                  {"Hi " + user.name + " !"}
                </h1>
                <p className="text-xl lg:text-2xl">{greeting}</p>
                <p className="text-xl lg:text-2xl">
                  Have a <u>great day</u>.
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
          <div className="">
            <div class="flex items-center justify-center">
              <div className="w-full">
                <div className="mb-5">
                  <span className="text-gray-600 text-2xl font-bold">
                    Recently visited
                  </span>
                </div>
                <div className="px-5 lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-2 gap-y-8">
                  {courses_HTMLLIST}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-none w-full px-5 lg:px-0 lg:flex-1 my-5 lg:my-0">
          <span className="text-lg text-gray-600 font-medium">Timeline</span>
          {assignments_HTMLLIST}
        </div>
      </div>
      <div className="my-5">
        <div className="space-y-2">
          <span className="text-gray-600 text-2xl font-bold">
            {user.role == 0 ? "Enroll now" : "Waiting for approval"}
          </span>
          {user.role == 0 ? (
            ""
          ) : (
            <div className=" flex space-x-2 text-green-400 font-semibold">
              <NavLink
                to="/new-course"
                className="relative p-2 border border-green-400 rounded-lg hover:text-white hover:bg-green-400"
              >
                New course
                <PlusCircleIcon className="absolute top-0 -right-1 w-2 animate-ping" />
              </NavLink>
            </div>
          )}
        </div>
        <div className="mt-5 lg:px-0 grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-8">
          {newCourses_HTMLLIST}
        </div>
      </div>
    </div>
  );
}

export default Home;
