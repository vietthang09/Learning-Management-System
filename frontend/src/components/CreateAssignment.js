import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import CreateAssignmentForm from "./forms/CreateAssignmentForm";

function CreateAssignment(props) {
  const courseId = props.match.params.id;
  const history = useHistory();
  return (
    <div className="flex justify-center items-center">
      <div className="w-full lg:w-1/2 px-5 lg:px-0">
        <div className="flex justify-between items-center py-10">
          <p className="font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest">
            NEW ASSIGNMENT
          </p>
          <button
            className="text-gray-600 font-semibold"
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
          >
            go back
          </button>
        </div>
        <CreateAssignmentForm id={courseId} />
      </div>
    </div>
  );
}

export default CreateAssignment;
