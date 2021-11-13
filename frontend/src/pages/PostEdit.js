import { PhotographIcon, XCircleIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { getPost, editPost } from "../api/API_Forum";

function PostEdit(props) {
  const postId = props.match.params.id;
  var [post, setPost] = useState([]);
  var [newPost, setNewPost] = useState({
    content: "",
  });
  var [selectedFile, setSelectedFile] = useState();
  var [URLImage, setURLImage] = useState();
  useEffect(() => {
    getPost(postId, setPost);
  }, []);

  function setURL(file) {
    setURLImage(URL.createObjectURL(file));
  }

  function removeImage() {
    setSelectedFile();
    setURLImage();
  }

  function handleInput(e) {
    setNewPost({ ...newPost, [e.target.name]: [e.target.value] });
  }
  function handleSubmit() {
    // editPost(postId, post.content, selectedFile, setResult);
  }
  return (
    <div className="flex justify-center">
      <div className="mt-5 w-2/3 flex border bg-white">
        <div className="flex-1 flex items-center bg-gray-50">
          <div className="relative">
            {selectedFile ? (
              <>
                <img src={URLImage} className="object-cover" />
                <XCircleIcon
                  className="absolute top-0 right-0 w-7 text-red-400 cursor-pointer"
                  onClick={removeImage}
                />
              </>
            ) : (
              <img
                src={`http://127.0.0.1:8000/${post.image_path}`}
                className="object-cover"
              />
            )}
            <div className="flex justify-center mt-5">
              <label htmlFor="file">
                <PhotographIcon className="w-16 text-green-400 cursor-pointer border-2 border-green-400 rounded-full" />
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                  setURL(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 p-3 divide-y divide-gray-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center p-2">
              <img
                src={`http://127.0.0.1:8000/${post.avatar}`}
                alt=""
                className="w-10 h-10 object-cover rounded-full shadow mr-2"
              />
              <span className="text-gray-500 font-medium">{post.name}</span>
            </div>
          </div>
          <div className="h-96">
            <textarea
              className="text-gray-500 w-full h-full focus:outline-none resize-none"
              defaultValue={post.content}
              name="content"
              onChange={(e) => handleInput(e)}
            ></textarea>
          </div>
          <button
            className="p-2 bg-green-400 text-white font-medium rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostEdit;
