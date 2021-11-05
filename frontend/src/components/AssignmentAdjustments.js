import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AssignmentAdjustments(props) {
  const assignmentId = props.match.params.id;
  var location = useLocation();
  var history = useHistory();
  const confirm = async (e) => {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let deadline = document.getElementById("deadline").value;
    if (!title || !content || !deadline) {
      toast.error("Please fill in all the information");
    } else {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/teacher/assignment/update",
        headers: { "Content-Type": "application/json" },
        data: {
          assignmentId: assignmentId,
          title: title,
          content: content,
          deadline: deadline,
        },
      }).then((response) => {
        if (response.data.status == 201) {
          toast.info("Done! Going back to the course");
          setTimeout(() => {
            history.goBack();
          }, 3000);
        } else {
          toast.error("Something went wrong, please try again!");
        }
      });
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-full lg:w-1/2 px-5 lg:px-0">
        <div className="flex justify-between items-center py-10">
          <p className="font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest">
            UPDATE ASSIGNMENT
          </p>
          <button
            className="text-gray-600 font-semibold"
            onClick={() => {
              history.goBack();
            }}
          >
            in {location.state.courseTitle}
          </button>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Title</label>
            <input
              type="text"
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="title"
              id="title"
              defaultValue={location.state.assignmentTitle}
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Content</label>
            <textarea
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="content"
              id="content"
              defaultValue={location.state.assignmentContent}
            ></textarea>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Deadline</label>
            <input
              type="date"
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="deadline"
              id="deadline"
              defaultValue={location.state.assignmentDeadline}
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <button
              className="mt-5 p-2 w-full bg-green-400 text-white font-semibold rounded-md hover:bg-green-500"
              onClick={confirm}
            >
              Confirm
            </button>
            <button
              className="p-2 w-full text-right text-red-400 font-semibold"
              onClick={confirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

export default AssignmentAdjustments;
