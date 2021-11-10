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
    console.log(response.data.recentlyCourses);
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

export function getNumberEnrolled(courseId, setNumberEnrolled) {
  var formData = new FormData();
  formData.append("courseId", courseId);
  axios({
    method: "POST",
    url: `${Master_URL_API_Course}number-enrolled?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setNumberEnrolled(response.data.numberEnrolled);
  });
}
