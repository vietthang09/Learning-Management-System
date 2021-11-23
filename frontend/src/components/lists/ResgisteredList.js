import React, { useState, useEffect } from "react";
import { checkEnrolled, getRegisteredList } from "../../api/API_Courses";
import { isStudent } from "../../api/Session";
import EnrollButton from "../buttons/EnrollButton";
import RowStudent from "../RowStudent";
import CancelButton from "../buttons/CancleButton";
function ResgisteredList(props) {
  var [students, setStudents] = useState([]);
  let [refresh, setRefresh] = useState(false);
  let [enrolled, setEnrolled] = useState();
  useEffect(() => {
    getRegisteredList(props.id, setStudents);
    checkEnrolled(props.id, setEnrolled);
    setRefresh(false);
  }, [refresh]);
  return (
    <>
      <table class="mb-3 min-w-full max-h-64 divide-y divide-gray-200 bg-white border">
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
      {isStudent() ? (
        enrolled ? (
          <CancelButton id={props.id} setRefresh={setRefresh} />
        ) : (
          <EnrollButton id={props.id} setRefresh={setRefresh} />
        )
      ) : (
        ""
      )}
    </>
  );
}

export default ResgisteredList;
