import React, { useState, useEffect } from "react";
import { getComments } from "../../api/API_Comments";
import { getPost } from "../../api/API_Forum";
import CreateCommentForm from "../forms/CreateCommentForm";

function PostDetailsLayout(props) {
  const postId = props.match.params.id;
  let [post, setPost] = useState([]);
  let [comments, setComments] = useState([]);
  useEffect(() => {
    getPost(postId, setPost);
    getComments(postId, setComments);
  }, []);
  return (
    <div>
      <div>
        <img src={"http://127.0.0.1:8000/" + post.image} />
      </div>
      <div>
        comment list {postId}
        <CreateCommentForm postId={postId} />
      </div>
    </div>
  );
}

export default PostDetailsLayout;
