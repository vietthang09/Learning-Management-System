import axios from "axios";
import React, { useState, useEffect } from "react";
function EnrolledList(props) {
  var [students, setStudents] = useState([]);
  useEffect(() => {
    var formData = new FormData();
    formData.append("courseId", props.courseId);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/enrolled-list",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }).then((response) => {
      if (response.data.status == 201) {
        setStudents(response.data.students);
      }
    });
  }, []);
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Number
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Registered at
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {students.map((item, index) => {
          return (
            <tr className="bg-emerald-200">
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap flex justify-between items-center">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.created_at}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default EnrolledList;
