const userInLocal = JSON.parse(localStorage.getItem("user"));
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
