import React, { useState } from "react";
import PostButton from "../buttons/PostButton";
function CreateCommentForm(props) {
  let [content, setContent] = useState();
  let [image, setImage] = useState([]);
  return (
    <div>
      <input type="text" placeholder="what ?" />
      <input type="file" accept="image/*" />
      <PostButton postId={props.postId} content={content} image={image} />
    </div>
  );
}

export default CreateCommentForm;
