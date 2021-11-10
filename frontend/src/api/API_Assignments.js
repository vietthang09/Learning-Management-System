import axios from "axios";
import { Master_URL_API_Assignment } from "../static/Master_URL";
import { getToken } from "./Session";

export function getNumberOfAssignmentsToday(setNumber) {
  axios({
    method: "POST",
    url: `${Master_URL_API_Assignment}number-today?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setNumber(response.data);
  });
}

export function getTimelineOfAssignments(setAssignments) {
  axios({
    method: "POST",
    url: `${Master_URL_API_Assignment}timeline?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setAssignments(response.data.assignments);
  });
}
