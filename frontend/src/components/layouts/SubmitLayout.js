import React from "react";
import SubmissionForm from "../forms/SubmissionForm";
import BackButton from "../buttons/BackButton";
function SubmitLayout(props) {
  return (
    <div className="container m-auto">
      <div className="flex justify-between items-center py-10">
        <BackButton />
        <p className="font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest uppercase">
          submission
        </p>
      </div>
      <SubmissionForm id={props.id} />
    </div>
  );
}

export default SubmitLayout;
