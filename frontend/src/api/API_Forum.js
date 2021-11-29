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
export function deletePost(id) {
  let formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_Forum}delete?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  });
}
export function getPost(id, setPost) {
  let formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_Forum}get-post?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setPost(response.data.post);
  });
}
export function countOfUser(userId, setNumberOfPosts) {
  var formData = new FormData();
  formData.append("id", userId);
  axios({
    method: "POST",
    url: `${Master_URL_API_Forum}count-of-user?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setNumberOfPosts(response.data.count);
  });
}
export function countOfAdmin(setToday, setYesterday) {
  axios({
    method: "POST",
    url: `${Master_URL_API_Forum}count-of-admin?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setToday(response.data.today);
    setYesterday(response.data.yesterday);
  });
}

export function getNumberPost(setNumberPost) {
  axios({
    method: "POST",
    url: `${Master_URL_API_Forum}number-post?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    setNumberPost(response.data.numberPost);
  });
}

export function getOwnPost(id, setposts) {
  var formData = new FormData();
  formData.append("id", id);
  axios({
    method: "POST",
    url: `${Master_URL_API_Forum}get-own-post?token=${getToken()}`,
    headers: { "Content-Type": "application/json" },
    data: formData,
  }).then((response) => {
    setposts(response.data.posts);
  });
}
