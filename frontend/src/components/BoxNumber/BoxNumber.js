import React, { useState, useEffect } from "react";
import { getNumberCourse } from "../../api/API_Courses";
import { getNumberPost } from "../../api/API_Forum";
import { getNumberStudent, getNumberTeacher } from "../../api/API_User";

function BoxNumber(props) {
  let [number, setNumber] = useState(0);
  useEffect(() => {
    switch (props.for) {
      case "student":
        getNumberStudent(setNumber);
        break;
      case "teacher":
        getNumberTeacher(setNumber);
        break;
      case "course":
        getNumberCourse(setNumber);
        break;
      case "post":
        getNumberPost(setNumber);
        break;
    }
  }, []);
  return (
    <div
      className={
        "p-5 flex justify-center items-baseline bg-gradient-to-r from-" +
        props.bg +
        "-300 to-" +
        props.bg +
        "-400 rounded-lg cursor-default hover:from-" +
        props.bg +
        "-400 hover:to-" +
        props.bg +
        "-300 shadow"
      }
    >
      <span className="text-6xl text-white">{number}</span>
      <span className="text-white font-medium uppercase">
        {number >= 2 ? props.for + "s" : props.for}
      </span>
    </div>
  );
}

export default BoxNumber;
