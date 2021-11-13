import axios from "axios";
import { Master_URL_API_Assignment } from "../static/Master_URL";
import { getToken } from "./Session";

export function getNumberOfAssignmentsToday(setNumber) {
  axios({
    method: "POST",
    url: `${Master_URL_API_Assignment}number-today?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setNumber(response.data);
  });
}

export function getTimelineOfAssignments(setAssignments) {
  axios({
    method: "POST",
    url: `${Master_URL_API_Assignment}timeline?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setAssignments(response.data.assignments);
  });
}
export function getAssignmentsOfCourse(id, setAssignments) {
  var formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_Assignment}in-course?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setAssignments(response.data.assignments);
  });
}

export function createAssignment(id, assignmentInfo) {
  var formData = new FormData();
  formData.append("id", id);
  formData.append("title", assignmentInfo.title);
  formData.append("content", assignmentInfo.content);
  formData.append("deadline", assignmentInfo.deadline);
  axios({
    method: "POST",
    url: `${Master_URL_API_Assignment}create?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}

export function getAssignmentInfo(id, setAssignmentInfo) {
  var formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_Assignment}info?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setAssignmentInfo(response.data.assignment);
  });
}

export function deleteAssignment(id) {
  var formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_Assignment}delete?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}
export function updateAssignment(id, assignmentInfo) {
  var formData = new FormData();
  formData.append("id", id);
  formData.append("title", assignmentInfo.assignmentTitle);
  formData.append("content", assignmentInfo.assignmentContent);
  formData.append("deadline", assignmentInfo.assignmentDeadline);
  axios({
    method: "POST",
    url: `${Master_URL_API_Assignment}update?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}
