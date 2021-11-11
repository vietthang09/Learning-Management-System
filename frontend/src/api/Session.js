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
