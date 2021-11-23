import axios from "axios";
import { Master_URL_API } from "../static/Master_URL";

export function setToken(token) {
  sessionStorage.setItem("access_token", token);
}
export function getToken() {
  return sessionStorage.getItem("access_token");
}
export function removeToken() {
  sessionStorage.removeItem("access_token");
}
export function setUser(user) {
  sessionStorage.setItem("user_info", JSON.stringify(user));
}
export function getUserData() {
  axios({
    method: "POST",
    url: `${Master_URL_API}auth/get-user?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setUser(response.data.user);
  });
}
export function getUser() {
  const user = sessionStorage.getItem("user_info");
  return JSON.parse(user);
}
export function removeUser() {
  sessionStorage.removeItem("user_info");
}

export function isStudent() {
  return getUser().role == 0;
}
export function isTeacher() {
  return getUser().role == 1;
}
export function isAdmin() {
  return getUser().role == 2;
}

export function checkActive() {
  return getUser().status == 1;
}
