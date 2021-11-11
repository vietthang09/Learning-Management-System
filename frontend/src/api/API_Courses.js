import axios from "axios";
import { Master_URL_API_Course } from "../static/Master_URL";
import { getToken } from "./Session";

export function getRecentlyCourses(setRecentlyCourses) {
  axios({
    method: "POST",
    url: `${Master_URL_API_Course}recently?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setRecentlyCourses(response.data.recentlyCourses);
  });
}

export function getAllCourses(setCourses) {
  axios({
    method: "POST",
    url: `${Master_URL_API_Course}all?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setCourses(response.data.courses);
  });
}

export function findCourse(input, setSearchResult) {
  var formData = new FormData();
  formData.append("searchInput", input);
  axios({
    method: "POST",
    url: `${Master_URL_API_Course}find?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setSearchResult(response.data.courses);
  });
}

export function getNewCourses(setNewCourses) {
  axios({
    method: "POST",
    url: `${Master_URL_API_Course}get-new?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setNewCourses(response.data.newCourses);
  });
}

export function createCourse(courseInfo, seletedImage) {
  var formData = new FormData();
  formData.append("title", courseInfo.title);
  formData.append("introduction", courseInfo.introduction);
  formData.append("cover", seletedImage);
  axios({
    method: "POST",
    url: `${Master_URL_API_Course}create?token=${getToken()}`,
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  });
}

export function getCourseInfo(id, setCourse) {
  var formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_Course}getInfo?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setCourse(response.data.course);
  });
}

export function cancelRequest(courseId) {
  var formData = new FormData();
  formData.append("id", courseId);
  axios({
    method: "POST",
    url: `${Master_URL_API_Course}cancel?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}

// For students
export function enroll(courseId) {
  var formData = new FormData();
  formData.append("id", courseId);
  axios({
    method: "POST",
    url: `${Master_URL_API_Course}enroll?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}

export function getRegisteredList(courseId, setStudents) {
  var formData = new FormData();
  formData.append("id", courseId);
  axios({
    method: "POST",
    url: `${Master_URL_API_Course}registered-list?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setStudents(response.data.students);
  });
}

