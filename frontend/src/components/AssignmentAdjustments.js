import React from "react";
import { useHistory } from "react-router";
import AdjustAssignmentForm from "./forms/AdjustAssignmentForm";
import SubmissionList from "./lists/SubmissionList";
function AssignmentAdjustments(props) {
  const assignmentId = props.match.params.id;
  const history = useHistory();
  return (
    <>
      <div className="container m-auto flex space-x-5">
        <div className="flex-1">
          <div className="flex justify-between items-center py-10">
            <p className="font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest uppercase">
              assignment
            </p>
            <button
              className="text-gray-600 font-semibold"
              onClick={() => {
                history.goBack();
              }}
            >
              go back
            </button>
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

export default AssignmentAdjustments;
