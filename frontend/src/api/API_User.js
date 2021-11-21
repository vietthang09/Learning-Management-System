import axios from "axios";
import { Master_URL_API, Master_URL_API_User } from "../static/Master_URL";
import {
  setToken,
  getToken,
  removeToken,
  setUser,
  removeUser,
  getUserData,
} from "./Session";
export function login(loginInfo, setErrors, history) {
  let formData = new FormData();
  formData.append("email", loginInfo.email);
  formData.append("password", loginInfo.password);
  axios({
    method: "POST",
    url: `${Master_URL_API}auth/login`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  })
    .then((response) => {
      setToken(response.data.access_token);
      setUser(response.data.user);
      history.push("/");
    })
    .catch((error) => {
      setErrors(error.response);
    });
}

export function logout() {
  removeToken();
  removeUser();
}

export function updateProfile(user, selectedImage) {
  var formData = new FormData();
  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("image", selectedImage);
  axios({
    method: "POST",
    url: `${Master_URL_API_User}update?token=${getToken()}`,
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  });
  getUserData();
}

export function getStudents(setStudents) {
  axios({
    method: "POST",
    url: `${Master_URL_API_User}students?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setStudents(response.data.students);
  });
}
export function getTeachers(setTeacher) {
  axios({
    method: "POST",
    url: `${Master_URL_API_User}teachers?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setTeacher(response.data.teachers);
  });
}

export function addStudent(user) {
  var formData = new FormData();
  formData.append("name", user.name);
  formData.append("email", user.email);
  axios({
    method: "POST",
    url: `${Master_URL_API_User}add-student?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}

export function addTeacher(user) {
  var formData = new FormData();
  formData.append("name", user.name);
  formData.append("email", user.email);
  axios({
    method: "POST",
    url: `${Master_URL_API_User}add-teacher?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}

export function editUser(user) {
  var formData = new FormData();
  formData.append("id", user.id);
  formData.append("name", user.name);
  formData.append("email", user.email);
  axios({
    method: "POST",
    url: `${Master_URL_API_User}edit-user?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}

export function deleteUser(user) {
  var formData = new FormData();
  formData.append("id", user.id);
  axios({
    method: "POST",
    url: `${Master_URL_API_User}delete?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}
export function changeUserStatus(id) {
  var formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_User}change-status?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}
