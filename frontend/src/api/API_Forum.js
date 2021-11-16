import axios from "axios";
import { Master_URL_API_Forum } from "../static/Master_URL";
import { getToken } from "./Session";
export function getPosts(setPosts) {
  axios({
    method: "GET",
    url: `${Master_URL_API_Forum}posts?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setPosts(response.data.posts);
  });
}
export function createPost(content, image) {
  let formData = new FormData();
  formData.append("content", content);
  formData.append("image", image);
  axios({
    method: "POST",
    url: `${Master_URL_API_Forum}create?token=${getToken()}`,
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  });
}
