import React from "react";
import RecentlyVisited from "../components/RecentlyVisited";
import Greeting from "../components/Greeting";
import AssignmentListMini from "../components/lists/AssignmentListMini";
import NewCoursesList from "../components/NewCoursesList";
import { isAdmin } from "../api/Session";
import Management from "../components/Management";
import Overview from "../components/Overview";

function Home() {
  return (
    <div className="container m-auto mt-5">
      <div class="flex flex-wrap space-x-5">
        <div className="flex-none px-5 lg:px-0 lg:flex-3">
          <Greeting />
          {isAdmin() ? <Management /> : <RecentlyVisited />}
        </div>
        <div class="flex-none w-full px-5 lg:px-0 lg:flex-1 my-5 lg:my-0">
          {isAdmin() ? <Overview /> : <AssignmentListMini />}
        </div>
      </div>
      <div className="my-5">{!isAdmin() && <NewCoursesList />}</div>
    </div>
  );
}

export default Home;
