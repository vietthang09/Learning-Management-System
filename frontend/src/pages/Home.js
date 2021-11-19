import React, { useEffect } from "react";
import RecentlyVisited from "../components/RecentlyVisited";
import Greeting from "../components/Greeting";
import AssignmentListMini from "../components/AssignmentListMini";
import NewCoursesList from "../components/NewCoursesList";
import { isAdmin } from "../api/Session";
import StudentList from "../components/lists/StudentList";
import TeacherList from "../components/lists/TeacherList";
import StudentManagement from "../components/StudentManagement";
import TeacherManagement from "../components/TeacherManagement";
import CourseManagement from "../components/CourseManagement";

function Home() {
  return (
    <div className="container m-auto mt-5">
      <div class="flex flex-wrap space-x-5">
        <div className="flex-none px-5 lg:px-0 lg:flex-3">
          <Greeting />
          {isAdmin() ? (
            <StudentManagement />
          ) : (
            <>
              <RecentlyVisited />
            </>
          )}
        </div>
        <div class="flex-none w-full px-5 lg:px-0 lg:flex-1 my-5 lg:my-0">
          <AssignmentListMini />
        </div>
      </div>
      <div className="my-5">
        {isAdmin() ? (
          <>
            <TeacherManagement />
            <CourseManagement />
          </>
        ) : (
          <NewCoursesList />
        )}
      </div>
    </div>
  );
}

export default Home;
