import React, { useState, useEffect } from "react";
import { getSubmissions } from "../../api/API_Submissions";
import UserAvatar from "../UserAvatar";
import moment from "moment";
function SubmissionList(props) {
  var [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    getSubmissions(props.id, setSubmissions);
  }, []);
  return (
    <div className="space-y-5 py-10">
      <div className="flex justify-between items-center">
        <p className="px-5 lg:px-0 font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest">
          SUBMISSIONS
        </p>
        <span className="text-gray-600 font-semibold">
          Quantity: {submissions ? submissions.length : 0}
        </span>
      </div>
      <div className="hidden lg:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
                Submissions
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Submitted at
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Mark
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.map((item) => {
              return (
                <tr className="bg-emerald-200">
                  <td className="flex">
                    <UserAvatar link={item.studentAvatar} />
                    {item.studentName}
                  </td>
                  <td>{item.fileName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {moment(item.submittedAt).utcOffset(420).fromNow()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.mark}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubmissionList;
