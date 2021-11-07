import React, { Fragment, useEffect, useState } from "react";
import {
  AnnotationIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { Popover, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
function PostCard(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [post, setPost] = useState([]);
  const [createdAt, setCreatedAt] = useState();
  let history = useHistory();
  async function loadDPost() {
    axios.get("http://127.0.0.1:8000/api/posts/" + props.id).then((res) => {
      setPost(res.data.post);
      setCreatedAt(res.data.createdAt);
    });
  }
  useEffect(() => {
    loadDPost();
  }, []);
  function deletePost() {
    let formData = new FormData();
    formData.append("postId", props.id);
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
  return (
    <Transition
      show={true}
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="mt-4 p-3 bg-white rounded-xl shadow">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            <img
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt=""
              className="w-10"
            />
            <div className="grid">
              <span className="text-xl font-medium">{post.name}</span>
              <span className="text-sm text-gray-400">{createdAt}</span>
            </div>
          </div>
          {post.user_id == user.id ? (
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
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 w-64 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white  grid-cols-1">
                          <button className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                              <PencilIcon className="w-5 text-gray-400" />
                            </div>
                            <div className="ml-4 flex">
                              <p className="text-sm font-medium text-gray-900">
                                Edit
                              </p>
                            </div>
                          </button>
                          <button
                            className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            onClick={deletePost}
                          >
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                              <TrashIcon className="w-5 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                Delete
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          ) : (
            ""
          )}
        </div>
        {/* End Header */}
        {/* Body */}
        <div className="mt-2 mb-2">
          <img
            src={"http://127.0.0.1:8000/" + post.image_path}
            alt={post.image_path}
            className="rounded-md"
          />
        </div>
        {/* End Body */}
        {/* Footer */}
        <div className="flex space-x-5 justify-between items-center">
          <p className="text-gray-800 w-full truncate">{post.content}</p>
          <NavLink
            to={{
              pathname: "/forum/" + props.id,
              state: {
                author: post.name,
                createdAt: createdAt,
                image: post.image_path,
                content: post.content,
              },
            }}
          >
            <AnnotationIcon className="w-7 text-gray-400" />
          </NavLink>
        </div>
        {/* End Footer */}
      </div>
    </Transition>
  );
}

export default PostCard;
