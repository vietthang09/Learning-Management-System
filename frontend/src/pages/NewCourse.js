import React from "react";
import { useLocation } from "react-router-dom";
function NewCourse(props) {
  var location = new useLocation();
  return (
    <div>
      <div className="container m-auto mt-5">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-2/3 order-2 lg:order-1">
            <div className="p-5"></div>
          </div>
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <div className="p-3 shadow rounded-xl">
              <img
                src={"http://localhost:8000/" + location.state.cover}
                alt=""
                className="object-cover rounded-xl"
              />
              <div className="space-y-3">
                <p className="text-2xl font-bold text-gray-600">
                  {location.state.title}
                </p>
                <div className="flex items-center">
                  <img
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt=""
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <span className="text-gray-500 text-lg font-medium">
                    {location.state.teacherName}
                  </span>
                </div>
                <p className="text-gray-400">{location.state.introduction}</p>
              </div>
              <div className="flex justify-center">
                <button className="mt-5 mb-10 px-16 py-2 text-green-500 bg-green-100 rounded-xl">
                  Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCourse;
