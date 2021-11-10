import axios from "axios";
import { Master_URL_API } from "../static/Master_URL";
import { getToken } from "./Session";

export function getRecentlyCourses(setRecentlyCourses) {
  axios({
    method: "POST",
    url: `${Master_URL_API}recently-courses?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setRecentlyCourses(response.data.recentlyCourses);
  });
}
