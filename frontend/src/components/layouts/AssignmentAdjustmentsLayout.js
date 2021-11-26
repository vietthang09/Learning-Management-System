import React from "react";
import AdjustAssignmentForm from "../forms/AdjustAssignmentForm";
import SubmissionList from "../lists/SubmissionList";
import BackButton from "../buttons/BackButton";
function AssignmentAdjustmentsLayout(props) {
  const assignmentId = props.match.params.id;
  return (
    <>
      <div className="container m-auto flex space-x-5">
        <div className="flex-1">
          <div className="flex justify-between items-center py-10">
            <BackButton />
            <p className="font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest uppercase">
              assignment
            </p>
          </div>
          <AdjustAssignmentForm id={assignmentId} />
        </div>
        <div className="flex-2">
          <SubmissionList id={assignmentId} />
        </div>
      </div>
    </>
  );
}

export default AssignmentAdjustmentsLayout;
