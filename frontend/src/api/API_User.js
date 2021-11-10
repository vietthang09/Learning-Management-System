import axios from "axios";
import { Master_URL_API } from "../static/Master_URL";
import {
  setToken,
  getToken,
  removeToken,
  setUser,
  removeUser,
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
      setErrors(error.response.data);
    });
}
export function logout() {
  removeToken();
  removeUser();
}
