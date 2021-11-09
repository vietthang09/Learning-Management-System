import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import moment from "moment";
import { Popover } from "@headlessui/react";
import {
  PhotographIcon,
  XCircleIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link, useHistory } from "react-router-dom";
function PostDetail(props) {
  var [comments, setComments] = useState([]);
  var location = useLocation();
  const postId = props.match.params.id;
  const user = JSON.parse(localStorage.getItem("user"));
  var [selectedFile, setSelectedFile] = useState();
  var [url, setUrl] = useState();
  let history = useHistory();
  function deletePost() {
    let formData = new FormData();
    formData.append("postId", postId);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/posts/delete-post",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }).then((response) => {
      if (response.data.status == 201) {
        history.push("/");
        history.replace("/forum");
      }
    });
  }
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
    formData.append("image", selectedFile);
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

  function removeImage() {
    setSelectedFile();
    setUrl();
  }
  return (
    <div className="flex justify-center">
      <div className="mt-5 w-2/3 flex border bg-white">
        <div className="flex-1 flex items-center bg-gray-50">
          <img
            src={"http://127.0.0.1:8000/" + location.state.image}
            className="object-cover"
          />
        </div>
        <div className="flex-1 p-3 divide-y divide-gray-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center p-2">
              <img
                src={`http://127.0.0.1:8000/${location.state.authorAvatar}`}
                alt=""
                className="w-10 h-10 object-cover rounded-full shadow mr-2"
              />
              <span className="text-gray-500 font-medium">
                {location.state.author}
              </span>
            </div>
            {location.state.authorId == user.id ? (
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={`
                ${open ? "" : "text-opacity-90"}
                text-gray-500 group px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <ChevronDownIcon
                        className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                        aria-hidden="true"
                      />
                    </Popover.Button>
                    <Popover.Panel className="absolute z-10 w-48 px-4 mt-3 transform -translate-x-1/2 left-1/2">
                      <div className="bg-white p-3 space-y-5 shadow-xl rounded-xl">
                        <Link
                          to={"/forum/edit/" + postId}
                          className="flex items-center space-x-10 group"
                        >
                          <PencilIcon className="w-5 text-gray-400 group-hover:text-green-400" />
                          <span className="text-gray-500 font-medium group-hover:text-green-400">
                            Edit
                          </span>
                        </Link>
                        <button
                          className="flex items-center space-x-10 group"
                          onClick={deletePost}
                        >
                          <TrashIcon className="w-5 text-gray-400 group-hover:text-red-400" />
                          <span className="text-gray-500 font-medium group-hover:text-red-400">
                            Delete
                          </span>
                        </button>
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>
            ) : (
              ""
            )}
          </div>
          <div className="relative h-96">
            <div className="overflow-y-scroll h-72 hidescroll">
              <p className="text-gray-500">{location.state.content}</p>
              <span className="text-sm text-gray-400">
                {moment(location.state.createdAt).utcOffset(420).fromNow()}
              </span>
              <div className="mt-5 space-y-5">
                {comments.map((comment) => {
                  return (
                    <>
                      <div className="flex items-center space-x-5 comment">
                        <img
                          src={`http://127.0.0.1:8000/${comment.avatar}`}
                          alt=""
                          className="w-8 h-8 object-cover rounded-full shadow"
                        />
                        <div>
                          <p className="space-x-2 text-gray-500">
                            <span className="font-medium text-gray-600">
                              {comment.user_id == user.id
                                ? "You"
                                : comment.name}
                            </span>
                            <span>{comment.content}</span>
                          </p>
                          <div className="space-x-5 flex items-center">
                            <span className="text-gray-400 text-xs">
                              {moment(comment.created_at)
                                .utcOffset(420)
                                .fromNow()}
                            </span>
                            {comment.user_id == user.id ? (
                              <button
                                id={comment.commentId}
                                onClick={(e) => deleteComment(e)}
                                className="button hidden text-red-400 font-medium text-xs"
                              >
                                Delete
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                      {comment.image_link ? (
                        <img
                          src={"http://127.0.0.1:8000/" + comment.image_link}
                          alt=""
                          className="w-32 ml-12"
                        />
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </div>
            </div>
            <div className="absolute bottom-0 flex justify-between items-center w-full h-12">
              <div className="flex space-x-2 relative w-2/3">
                <div>
                  <label htmlFor="file">
                    <PhotographIcon className="w-7 text-green-400 cursor-pointer" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                      setUrl(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </div>
                <input
                  type="text"
                  id="content"
                  className="focus:outline-none w-full"
                  placeholder="Add a comment..."
                />
              </div>
              {selectedFile ? (
                <div className="relative w-24 h-24">
                  <img
                    src={url}
                    className="mt-2 w-12 h-12 object-cover rounded-lg"
                  />
                  <XCircleIcon
                    className="absolute top-0 right-7 w-7 text-red-400 cursor-pointer"
                    onClick={removeImage}
                  />
                </div>
              ) : (
                ""
              )}
              <button
                onClick={postComment}
                className="text-green-400 font-medium"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
