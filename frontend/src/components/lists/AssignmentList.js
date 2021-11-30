import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAssignmentsOfCourse } from "../../api/API_Assignments";
import { isTeacher } from "../../api/Session";
import Blank from "../Blank";
import AssignmentCardMini from "../cards/AssignmentCardMini";
import Loading from "../Loading";

function AssignmentList(props) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getAssignmentsOfCourse(props.id, setloading, setAssignments);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : assignments.length >= 1 ? (
        assignments.map((item, index) => {
          return (
            <>
              {isTeacher() ? (
                <Link to={"/assignment/update/" + item.assignmentId}>
                  <AssignmentCardMini data={item} />
                </Link>
              ) : (
                <Link to={"/submission/submit/" + item.assignmentId}>
                  <AssignmentCardMini data={item} />
                </Link>
              )}
            </>
          );
        })
      ) : (
        <Blank />
      )}
      {}
    </>
  );
}

export default AssignmentList;
