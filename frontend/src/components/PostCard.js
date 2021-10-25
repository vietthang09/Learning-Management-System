import React from "react";
import { LightBulbIcon, AnnotationIcon } from "@heroicons/react/outline";
import CommentCard from "./CommentCard";
function PostCard() {
  return (
    <div className="mt-4 p-3 rounded-xl shadow">
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
        <img
          src="https://cdn.tgdd.vn/hoi-dap/1216572/tri-tue-nhan-tao-ai-la-gi-cac-ung-dung-va-tiem-nan-11-800x450.jpg"
          alt=""
          className="rounded-md"
        />
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
