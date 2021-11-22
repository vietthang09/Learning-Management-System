import React, { useState, useEffect } from "react";
import { getNumberOfAssignmentsToday } from "../api/API_Assignments";
import { getUser, isAdmin } from "../api/Session";

function Greeting() {
  var [number, setNumber] = useState();
  useEffect(() => {
    getNumberOfAssignmentsToday(setNumber);
  }, []);
  return (
    <div className="mb-5 relative">
      <div class="p-5 h-52 bg-green-400 text-white flex items-center justify-start rounded-3xl shadow-lg">
        <div className="p-5">
          <h1 className="mb-5 text-4xl lg:text-5xl font-bold">
            {"Hi " + getUser().name + " !"}
          </h1>
          {isAdmin() ? (
            <p className="text-xl lg:text-2xl">
              Have a <u>great day</u>.
            </p>
          ) : (
            <>
              <p className="text-xl lg:text-2xl">
                {number
                  ? "There are " + number + " today"
                  : "No assignment today"}
              </p>
              <p className="text-xl lg:text-2xl">
                Have a <u>great day</u>.
              </p>
            </>
          )}
        </div>
      </div>
      <div className="hidden lg:block absolute top-0 right-10">
        {isAdmin() ? (
          <img src="./assets/img/Accept-tasks-bro.svg" className="w-64" />
        ) : (
          <img src="./assets/img/Learning-bro.svg" className="w-64" />
        )}
      </div>
    </div>
  );
}

export default Greeting;
