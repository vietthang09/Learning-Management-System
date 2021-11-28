import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTimelineOfAssignments } from "../../api/API_Assignments";
import AssignmentCardMini from "../cards/AssignmentCardMini";

function AssignmentListMini() {
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    getTimelineOfAssignments(setAssignments);
  }, []);

  return (
    <>
      <div>
        <span className="text-lg text-gray-600 font-medium">Timeline</span>
        <div>
          {assignments.map((item, index) => {
            return (
              <Link key={index} to={`/courses/${item.course_id}`}>
                <AssignmentCardMini data={item} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AssignmentListMini;
