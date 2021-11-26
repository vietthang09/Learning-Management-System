import React, { useEffect, useState } from "react";
import DeleteButton from "../buttons/DeleteButton";
import ConfirmButton from "../buttons/ConfirmButton";
import moment from "moment";
import { TrashIcon } from "@heroicons/react/outline";
import { getAssignmentInfo } from "../../api/API_Assignments";
import { checkSubmission } from "../../api/API_Submissions";
import LoadingButton from "../buttons/LoadingButton";
function SubmissionForm(props) {
  // States
  const [selectedFile, setSelectedFile] = useState([]);
  const [submissionInfo, setSubmissionInfo] = useState([]);
  const [assignmentInfo, setAssignmentInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // End States
  // Functions
  useEffect(() => {
    getAssignmentInfo(props.id, setAssignmentInfo);
    checkSubmission(props.id, setSubmissionInfo);
    setRefresh(false);
  }, [refresh]);
  // End Functions

  // Temp
  const today = moment().format("YYYYMMDD");
  const deadline = moment(assignmentInfo.assignmentDeadline).format("YYYYMMDD");
  // End Temp
  return (
    <div className="space-y-5 m-auto">
      <div className="py-5 flex space-x-10">
        <div className="flex-1">
          <p className="text-2xl text-gray-600">Requirements</p>
          <span className="text-sm text-gray-400">
            Please carefully read the request from the teacher and submit the
            assignment on time.
          </span>
        </div>
        <div className="flex-2 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Title</label>
            <span className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400">
              {assignmentInfo.assignmentTitle}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Content</label>
            <p className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400">
              {assignmentInfo.assignmentContent}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Deadline</label>
            <p className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400">
              {assignmentInfo.assignmentDeadline}
            </p>
          </div>
        </div>
      </div>
      <div className="pt-5 flex space-x-10">
        <div className="flex-1">
          <div>
            <p className="text-2xl text-gray-600">Submission</p>
            <span className="text-sm text-gray-400">
              Post your submission here, you can only submit or update them
              while there is a deadline.
            </span>
          </div>
        </div>
        <div className="flex-2 space-y-5">
          <div className="space-y-5">
            <label className="block text-sm text-gray-500">Attachment</label>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <span>
                  {submissionInfo ? "You submitted" : "You have not submiited"}
                  {submissionInfo && (
                    <>
                      <span>
                        <a
                          href={
                            "http://127.0.0.1:8000/api/submission/download/" +
                            submissionInfo.submissionId
                          }
                          className="underline"
                        >
                          {" " + submissionInfo.submissionFileName + " "}
                        </a>
                        {moment(submissionInfo.submittedAt)
                          .utcOffset(420)
                          .fromNow()}
                      </span>
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center">
                {submissionInfo && (
                  <span className="block mr-5 text-sm text-gray-500">
                    Do you want to update ?
                  </span>
                )}
                {today > deadline && submissionInfo == null ? (
                  ""
                ) : (
                  <div className="flex space-x-3">
                    <label
                      htmlFor="file"
                      className="text-green-400 font-semibold rounded-lg cursor-pointer hover:text-green-500 w-44 truncate"
                    >
                      {selectedFile.name ? selectedFile.name : "Choose file"}
                    </label>
                    <input
                      type="file"
                      className="hidden"
                      id="file"
                      name="file"
                      onChange={(e) => {
                        setSelectedFile(e.target.files[0]);
                      }}
                    />
                    {selectedFile.name && (
                      <TrashIcon
                        className="w-7 text-red-400 border-2 border-red-400 rounded-full cursor-pointer hover:text-red-500 hover:border-red-500"
                        onClickCapture={(e) => {
                          e.preventDefault();
                          setSelectedFile([]);
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space-x-5">
            {loading && <LoadingButton width="w-16" />}
            {selectedFile.name && (
              <ConfirmButton
                type={
                  submissionInfo ? "update-submission" : "create-submission"
                }
                id={submissionInfo ? submissionInfo.submissionId : props.id}
                data={selectedFile}
                setRefresh={setRefresh}
                setLoading={setLoading}
                setSelectedFile={setSelectedFile}
              />
            )}
            {submissionInfo && (
              <DeleteButton
                type="delete-submission"
                id={submissionInfo.submissionId}
                setRefresh={setRefresh}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmissionForm;
