import React from "react";

function SubmissionList() {
  return (
    <div className="space-y-5">
      <div className="py-5 flex justify-between items-center">
        <p className="px-5 lg:px-0 font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest">
          SUBMISSIONS
        </p>
        <span className="text-gray-600 font-semibold">
          {/* Quantity: {submissions ? submissions.length : 0} */}
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
            {/* {submissions.map((item) => {
                    return (
                      <tr className="bg-emerald-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex justify-between items-center">
                          {item.fileName}
                          <a
                            href={
                              "http://127.0.0.1:8000/api/download/" + item.id
                            }
                          >
                            <DownloadIcon className="w-5" />
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.created_at}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            className="w-16 focus:outline-none focus:ring-2 focus:ring-green-400"
                            defaultValue={item.mark}
                            onChange={(e) => giveMark(e, item.id)}
                          />
                          <span
                            id="saved"
                            className="text-gray-400 font-medium"
                          ></span>
                        </td>
                      </tr>
                    );
                  })} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SubmissionList;
