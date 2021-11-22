import React from "react";
import {
  findStudent,
  findTeacher,
  getStudents,
  getTeachers,
} from "../../api/API_User";

function SearchUserForm(props) {
  function handleInput(e) {
    if (e.target.value) {
      if (props.for == "student") {
        findStudent(e.target.value, props.setUsers);
      } else if (props.for == "teacher") {
        findTeacher(e.target.value, props.setUsers);
      }
    } else {
      if (props.for == "student") {
        getStudents(props.setUsers);
      } else if (props.for == "teacher") {
        getTeachers(props.setUsers);
      }
    }
  }
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-between lg:w-80 p-2 bg-gray-100 rounded-md relative shadow-inner">
        <input
          type="text"
          className="w-full bg-gray-100 text-gray-500 focus:outline-none"
          placeholder="What person are you looking for?"
          onChange={(e) => handleInput(e)}
        />
      </div>
    </div>
  );
}

export default SearchUserForm;
