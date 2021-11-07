import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

function PostDetail(props) {
  var [comments, setComments] = useState([]);
  var location = useLocation();
  const postId = props.match.params.id;
  const user = JSON.parse(localStorage.getItem("user"));
  async function loadComment() {
    let formData = new FormData();
    formData.append("postId", postId);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/posts/comments",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }).then((response) => {
      if (response.data.status == 201) {
        setComments(response.data.comments);
      }
    });
  }
  useEffect(() => {
    loadComment();
  }, []);

  function postComment() {
    let content = document.getElementById("content").value;
    let formData = new FormData();
    formData.append("postId", postId);
    formData.append("userId", user.id);
    formData.append("content", content);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/posts/post-comment",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }).then((response) => {
      if (response.data.status == 201) {
        loadComment();
      }
    });
  }
  function deleteComment(e) {
    let commentId = e.target.id;
    let formData = new FormData();
    formData.append("commentId", commentId);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/posts/delete-comment",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }).then((response) => {
      if (response.data.status == 201) {
        loadComment();
      }
    });
  }
  return (
    <div>
      <img
        src={"http://127.0.0.1:8000/" + location.state.image}
        className="w-64"
      />
      <span>Created at {location.state.createdAt}</span>
      <span>{location.state.author}</span>
      <p>{location.state.content}</p>
      <input type="text" id="content" />
      <input type="file" />
      <button onClick={postComment}>Post</button>
      {comments.map((comment) => {
        return (
          <div>
            <span>{comment.user_id == user.id ? "You" : comment.name}</span>
            <span>{comment.content}</span>
            <span>{comment.created_at}</span>
            {comment.user_id == user.id ? (
              <button
                className="text-red-400"
                id={comment.commentId}
                onClick={(e) => deleteComment(e)}
              >
                Delete
              </button>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PostDetail;
