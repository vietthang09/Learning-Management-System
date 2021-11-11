import React, { useState, useEffect } from "react";
import { getRegisteredList } from "../../api/API_Courses";
import { isStudent, getUser } from "../../api/Session";
import EnrollButton from "../buttons/EnrollButton";
import RowStudent from "../RowStudent";
import CancelButton from "../buttons/CancleButton";
function ResgisteredList(props) {
  var [students, setStudents] = useState([]);
  function checkEnrolled() {
    var count = 0;
    students.map((item) => {
      if (item.studentId == getUser().id) {
        count++;
      }
    });
    return count;
  }
  useEffect(() => {
    getRegisteredList(props.id, setStudents);
  }, []);
  return (
    <>
      {isStudent() ? (
        checkEnrolled() ? (
          <CancelButton id={props.id} />
        ) : (
          <EnrollButton id={props.id} />
        )
      ) : (
        ""
      )}
      <table class="min-w-full max-h-64 divide-y divide-gray-200 bg-white border">
        <thead class="bg-white">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Number
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {students.map((item, index) => {
            return <RowStudent key={index} data={item} index={index + 1} />;
          })}
        </tbody>
      </table>
    </>
  );
}

export default ResgisteredList;
