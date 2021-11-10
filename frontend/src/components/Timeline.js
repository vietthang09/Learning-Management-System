import React from "react";
import AssignmentList from "../components/AssignmentList";
function Timeline() {
  return (
    <div>
      <span className="text-lg text-gray-600 font-medium">Timeline</span>
      <div>
        <AssignmentList />
      </div>
    </div>
  );
}

export default Timeline;
