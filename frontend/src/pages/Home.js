import React from "react";
import RecentlyVisited from "../components/RecentlyVisited";
import Greeting from "../components/Greeting";
import AssignmentListMini from "../components/AssignmentListMini";
import NewCoursesList from "../components/NewCoursesList";
function Home() {
  return (
    <div className="container m-auto mt-5">
      <div class="flex flex-wrap space-x-5">
        <div className="flex-none px-5 lg:px-0 lg:flex-3">
          <Greeting />
          <div>
            <RecentlyVisited />
          </div>
        </div>
        <div class="flex-none w-full px-5 lg:px-0 lg:flex-1 my-5 lg:my-0">
          <AssignmentListMini />
        </div>
      </div>
      <div className="my-5">
        <div className="mt-5 lg:px-0 grid grid-cols-1 lg:grid-cols-4 gap-4 gap-y-8">
          <NewCoursesList />
        </div>
      </div>
    </div>
  );
}

export default Home;
