import React, { useEffect, useState } from "react";
import { AnnotationIcon } from "@heroicons/react/outline";
import CommentCard from "./CommentCard";
import axios from "axios";
function PostCard(props) {
  const [post, setPost] = useState([]);
  useEffect(() => {
    loadPost();
  }, []);
  function loadPost() {
    axios.get("http://127.0.0.1:8000/api/post/" + props.id).then((res) => {
      setPost(res.data.post);
    });
  }
  return (
    <div className="mt-4 p-3 bg-white rounded-xl shadow">
      {/* Header */}
      <div className="flex space-x-1 items-center">
        <img
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt=""
          className="w-10"
        />
        <div className="grid">
          <span className="text-xl font-medium">Username</span>
          <span className="text-sm text-gray-400">1 hours ago</span>
        </div>
      </div>
      {/* End Header */}
      {/* Body */}
      <div className="mt-2 mb-2">
        <img src={post.image} alt="" className="rounded-md" />
      </div>
      {/* End Body */}
      {/* Footer */}
      <div className="flex space-x-5 justify-between items-center">
        <p className="text-gray-800 w-full truncate">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
          architecto quae quisquam dolores. Tenetur earum rem quidem, enim iste
          soluta.
        </p>
        <AnnotationIcon className="w-7 text-gray-400" />
      </div>
      {/* End Footer */}
      {/* Comments */}
      <div>
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </div>
      {/* End Comments */}
    </div>
  );
}

export default PostCard;
