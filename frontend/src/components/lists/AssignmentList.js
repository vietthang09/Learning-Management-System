import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAssignmentsOfCourse } from "../../api/API_Assignments";
import { isTeacher } from "../../api/Session";
import AssignmentCardMini from "../AssignmentCardMini";

function AssignmentList(props) {
  var [assignments, setAssignments] = useState([]);
  useEffect(() => {
    getAssignmentsOfCourse(props.id, setAssignments);
  }, []);
  return (
    <>
      {assignments.map((item, index) => {
        return (
          <>
            {isTeacher() ? (
              <Link to={"/assignment/update/" + item.assignmentId}>
                <AssignmentCardMini data={item} />
              </Link>
            ) : (
              <AssignmentCardMini data={item} />
            )}
          </>
        );
      })}
    </>
  );
}

export default AssignmentList;
