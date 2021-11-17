import React from "react";
import { createComment } from "../../api/API_Comments";
function PostButton(props) {
  function confirm(e) {
    e.preventDefault();
    createComment(props.postId, props.content, props.image);
    props.setAddComment(true);
  }
  return (
    <button
      className="text-green-400 font-semibold rounded-md hover:text-green-500"
      onClick={(e) => confirm(e)}
    >
      Post
    </button>
  );
}

export default PostButton;
