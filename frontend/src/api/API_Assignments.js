import axios from "axios";
import { Master_URL_API } from "../static/Master_URL";
import { getToken } from "./Session";

export function getNumberOfAssignmentsToday(setNumber) {
  axios({
    method: "POST",
    url: `${Master_URL_API}number-assignments-today?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setNumber(response.data);
  });
}

export function getTimelineOfAssignments(setAssignments) {
  axios({
    method: "POST",
    url: `${Master_URL_API}timeline-assignments?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setAssignments(response.data.assignments);
  });
}
