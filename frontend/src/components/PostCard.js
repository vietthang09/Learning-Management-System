import React, { useEffect, useState } from "react";
import {
  AnnotationIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { Popover } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
import moment from "moment";
function PostCard(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [post, setPost] = useState([]);
  let history = useHistory();
  async function loadDPost() {
    axios.get("http://127.0.0.1:8000/api/posts/" + props.id).then((res) => {
      setPost(res.data.post);
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
    <div className="mt-4 p-3 bg-white border">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src={"http://127.0.0.1:8000/" + post.avatar}
            alt=""
            className="w-10 h-10 object-cover rounded-full shadow"
          />
          <div className="grid">
            <span className="text-xl text-gray-600 font-medium">
              {post.name}
            </span>
            <span className="text-xs font-medium text-gray-400">
              {moment(post.created_at).utcOffset(420).fromNow()}
            </span>
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
                <Popover.Panel className="absolute z-10 w-48 px-4 mt-3 transform -translate-x-1/2 left-1/2">
                  <div className="bg-white p-3 space-y-5 shadow-xl rounded-xl">
                    <Link
                      to={"/forum/edit/" + props.id}
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
      <div className="mt-2 mb-2">
        <img
          src={"http://127.0.0.1:8000/" + post.image_path}
          className="rounded-md border"
        />
      </div>
      <div className="flex space-x-5 justify-between items-center">
        <p className="text-gray-600 w-full truncate">{post.content}</p>
        <NavLink
          to={{
            pathname: `/forum/${props.id}`,
            state: {
              authorId: post.user_id,
              author: post.name,
              authorAvatar: post.avatar,
              createdAt: post.created_at,
              image: post.image_path,
              content: post.content,
            },
          }}
        >
          <AnnotationIcon className="w-7 text-gray-500" />
        </NavLink>
      </div>
    </div>
  );
}

export default PostCard;
