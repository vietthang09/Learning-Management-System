import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTimelineOfAssignments } from "../api/API_Assignments";
import AssignmentCard from "./AssignmentCard";
function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    getTimelineOfAssignments(setAssignments);
  }, []);

  return (
    <>
      {assignments.map((item) => {
        <Link to={"/courses/" + item.course_id}>
          <AssignmentCard type={false} teacherAvatar={item.avatar} />
        </Link>;
      })}
    </>
  );
}

export default AssignmentList;
