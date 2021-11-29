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
export function login(loginInfo, remember, seterrors, setloading, history) {
  setloading(true);
  let formData = new FormData();
  formData.append("email", loginInfo.email);
  formData.append("password", loginInfo.password);
  formData.append("remember", remember);
  axios({
    method: "POST",
    url: `${Master_URL_API}auth/login`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  })
    .then((response) => {
      if (response.data.access_token) {
        setToken(response.data.access_token);
        setUser(response.data.user);
        setloading(false);
        history.push("/");
      }
    })
    .catch((error) => {
      seterrors(error.response.data);
      setloading(false);
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

export function getStudents(setStudents, pageNumber = 1) {
  axios({
    method: "POST",
    url: `${Master_URL_API_User}students?page=${pageNumber}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setStudents(response.data.students);
  });
}
export function getStudentsWithFilter(setStudents, filter, pageNumber = 1) {
  var formData = new FormData();
  formData.append("filter", filter.name);
  axios({
    method: "POST",
    url: `${Master_URL_API_User}filter-students?page=${pageNumber}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setStudents(response.data.students);
  });
}

export function getTeachersWithFilter(setTeachers, filter, pageNumber = 1) {
  var formData = new FormData();
  formData.append("filter", filter.name);
  axios({
    method: "POST",
    url: `${Master_URL_API_User}filter-teachers?page=${pageNumber}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setTeachers(response.data.teachers);
  });
}

export function getTeachers(setTeacher, pageNumber = 1) {
  axios({
    method: "POST",
    url: `${Master_URL_API_User}teachers?page=${pageNumber}`,
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

export function getNumberStudent(setNumberStudent) {
  axios({
    method: "POST",
    url: `${Master_URL_API_User}number-student?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setNumberStudent(response.data.numberStudent);
  });
}

export function getNumberTeacher(setNumberTeacher) {
  axios({
    method: "POST",
    url: `${Master_URL_API_User}number-teacher?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setNumberTeacher(response.data.numberTeacher);
  });
}

export function findStudent(input, setUsers) {
  var formData = new FormData();
  formData.append("input", input);
  axios({
    method: "POST",
    url: `${Master_URL_API_User}find-student?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setUsers(response.data.students);
  });
}

export function findTeacher(input, setUsers) {
  var formData = new FormData();
  formData.append("input", input);
  axios({
    method: "POST",
    url: `${Master_URL_API_User}find-teacher?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setUsers(response.data.teachers);
  });
}

export function getUserById(id, setUser) {
  var formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_User}get-by-id?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setUser(response.data.user);
  });
}
