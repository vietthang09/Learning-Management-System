import axios from "axios";
import { Master_URL_API_Submission } from "../static/Master_URL";
import { getToken } from "./Session";

export function createSubmission(id, selectedFile) {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("file", selectedFile);
  axios({
    method: "POST",
    url: `${Master_URL_API_Submission}create?token=${getToken()}`,
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  });
}
export function checkSubmission(id, setSubmissionInfo) {
  const formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_Submission}check?token=${getToken()}`,
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  }).then((response) => {
    setSubmissionInfo(response.data.submission);
  });
}
export function deleteSubmission(id) {
  const formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_Submission}delete?token=${getToken()}`,
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  });
}

// for students
export function updateSubmission(id, selectedFile) {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("file", selectedFile);
  axios({
    method: "POST",
    url: `${Master_URL_API_Submission}update?token=${getToken()}`,
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  });
}
