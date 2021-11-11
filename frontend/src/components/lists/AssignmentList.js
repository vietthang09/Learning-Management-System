import React, { useState, useEffect } from "react";
import { getAssignmentsOfCourse } from "../../api/API_Assignments";

function AssignmentList(props) {
  var [assignments, setAssignments] = useState([]);
  useEffect(() => {
    getAssignmentsOfCourse(props.id, setAssignments);
    console.log(assignments);
  }, []);
  return <div></div>;
}

export default AssignmentList;
