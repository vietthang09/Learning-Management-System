import axios from "axios";
import { Master_URL_API } from "../static/Master_URL";
import { getToken } from "./Session";
export function getPosts(setPosts) {
  axios({
    method: "GET",
    url: `${Master_URL_API}forum/posts?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setPosts(response.data.posts);
  });
}
export function getPost(id, setPost) {
  let formData = new FormData();
  formData.append("id", id);
  try {
    axios({
      method: "GET",
      url: "http://localhost:8000/api/posts/" + id,
      headers: { "Content-Type": "application/json" },
      data: formData,
    }).then((response) => {
      setPost(response.data.post);
    });
  } catch (error) {
    return error;
  }
}
export function editPost(id, content, image, setResult) {
  let formData = new FormData();
  formData.append("id", id);
  formData.append("content", content);
  formData.append("image", image);
  try {
    axios({
      method: "POST",
      url: "http://localhost:8000/api/posts/update",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }).then((response) => {
      setResult(response.data.status);
    });
  } catch (error) {
    return error;
  }
}
