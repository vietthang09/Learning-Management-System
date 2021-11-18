import axios from "axios";
import { Master_URL_API_Comment } from "../static/Master_URL";
import { getToken } from "./Session";

export function getComments(id, setComments) {
  let formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_Comment}get-comments?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setComments(response.data.comments);
  });
}
export function createComment(postId, content, image) {
  let formData = new FormData();
  formData.append("postId", postId);
  formData.append("content", content);
  formData.append("image", image);
  axios({
    method: "POST",
    url: `${Master_URL_API_Comment}create?token=${getToken()}`,
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  });
}
export function deleteComment(commentId) {
  let formData = new FormData();
  formData.append("id", commentId);
  axios({
    method: "POST",
    url: `${Master_URL_API_Comment}delete?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}
