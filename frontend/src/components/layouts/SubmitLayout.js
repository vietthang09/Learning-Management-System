import React from "react";
import SubmissionForm from "../forms/SubmissionForm";
import { useHistory } from "react-router";
function SubmitLayout(props) {
  const history = useHistory();
  return (
    <div className="container m-auto">
      <div className="flex justify-between items-center py-10">
        <p className="font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest uppercase">
          submission
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
      <SubmissionForm id={props.id} />
    </div>
  );
}

export default SubmitLayout;
