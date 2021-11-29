import React, { useState } from "react";
import { createComment } from "../../api/API_Comments";
import { PhotographIcon, XCircleIcon } from "@heroicons/react/outline";
function CreateCommentForm(props) {
  let [content, setContent] = useState();
  let [image, setImage] = useState([]);
  function confirm(e) {
    e.preventDefault();
    createComment(props.postId, content, image);
    var input = document.getElementById("content");
    input.value = "";
    setContent();
    setImage([]);
    props.setAddComment(true);
  }
  return (
    <div>
      <div className="p-3 flex space-x-3">
        <div className="w-full flex items-center space-x-3">
          <label htmlFor="image">
            <PhotographIcon className="w-5 text-green-400 hover:text-green-500 cursor-pointer" />
          </label>
          <input
            type="text"
            className="w-full focus:outline-none"
            placeholder="Add a comment..."
            id="content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <input
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <button
          className={`${
            content ? "text-green-400" : "hidden"
          }  font-semibold rounded-md hover:text-green-500`}
          onClick={(e) => {
            confirm(e);
          }}
        >
          Post
        </button>
      </div>
      {image.name && (
        <div className="relative w-32 h-32 ml-3">
          <img
            src={URL.createObjectURL(image)}
            className="w-full h-full object-cover border"
          />
          <button
            className="absolute top-0 right-0"
            onClick={(e) => {
              e.preventDefault();
              setImage([]);
            }}
          >
            <XCircleIcon className="w-5 text-red-400  cursor-pointer hover:text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateCommentForm;
