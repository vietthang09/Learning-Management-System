import axios from "axios";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
function EnrolledList(props) {
  var [students, setStudents] = useState([]);
  const loadData = async () => {
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
        console.log(response.data.students);
      } else {
        toast.error("Something went wrong, please try again!");
      }
    });
  };
  useEffect(() => {
    loadData();
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
            Submitted at
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
