import React, { useState } from "react";
import { createComment } from "../../api/API_Comments";

function CreateCommentForm(props) {
  let [content, setContent] = useState();
  let [image, setImage] = useState([]);
  function confirm(e) {
    e.preventDefault();
    createComment(props.postId, content, image);
    var input = document.getElementById("content");
    input.value = "";
    setContent();
    props.setAddComment(true);
  }
  return (
    <div className="p-3 flex">
      <input
        type="text"
        className="w-full focus:outline-none"
        placeholder="Add a comment..."
        id="content"
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <input type="file" className="hidden" accept="image/*" />
      <button
        className="text-green-400 font-semibold rounded-md hover:text-green-500"
        onClick={(e) => {
          confirm(e);
        }}
      >
        Post
      </button>
    </div>
  );
}

export default CreateCommentForm;
