import React, { Fragment, useEffect, useState } from "react";
import { AnnotationIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";

function PostCard(props) {
  const [post, setPost] = useState([]);
  const [createdAt, setCreatedAt] = useState();
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/posts/" + props.id).then((res) => {
      setPost(res.data.post);
      setCreatedAt(res.data.createdAt);
      console.log(res.data.post);
    });
  }, []);
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
        <div className="flex space-x-1 items-center">
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
