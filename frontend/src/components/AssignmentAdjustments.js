import React from "react";
import { useHistory } from "react-router";
import AdjustAssignmentForm from "./forms/AdjustAssignmentForm";
import SubmissionList from "./lists/SubmissionList";
function AssignmentAdjustments(props) {
  const assignmentId = props.match.params.id;
  const history = useHistory();
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-full lg:w-1/2 px-5 lg:px-0">
          <div className="flex justify-between items-center py-10">
            <p className="font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest">
              UPDATE ASSIGNMENT
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
          <SubmissionList />
        </div>
      </div>
    </>
  );
}

export default AssignmentAdjustments;
