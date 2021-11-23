import React from "react";
import CourseInfo from "../components/CourseInfo";
import ResgisteredList from "../components/lists/ResgisteredList";

function NewCourse(props) {
  const courseId = props.match.params.id;

  return (
    <div>
      <div className="container m-auto mt-5">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-2/3 order-2 lg:order-1">
            <div className="p-5">
              <ResgisteredList id={courseId} />
            </div>
          </div>
          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <CourseInfo id={courseId} full={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCourse;
