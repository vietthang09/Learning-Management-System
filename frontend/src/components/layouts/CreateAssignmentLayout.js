import React from "react";
import BackButton from "../buttons/BackButton";
import CreateAssignmentForm from "../forms/CreateAssignmentForm";

function CreateAssignmentLayout(props) {
  const courseId = props.match.params.id;
  return (
    <div className="flex justify-center items-center">
      <div className="w-full lg:w-1/2 px-5 lg:px-0">
        <div className="flex justify-between items-center py-10">
          <BackButton />
          <p className="font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest">
            NEW ASSIGNMENT
          </p>
        </div>
        <CreateAssignmentForm id={courseId} />
      </div>
    </div>
  );
}

export default CreateAssignmentLayout;
