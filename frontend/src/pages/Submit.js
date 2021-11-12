import React from "react";
import SubmitLayout from "../components/layouts/SubmitLayout";

function Submit(props) {
  const assignmentId = props.match.params.id;
  return (
    <div>
      <SubmitLayout id={assignmentId} />
    </div>
  );
}

export default Submit;
