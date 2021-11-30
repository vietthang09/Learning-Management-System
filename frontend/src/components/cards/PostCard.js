import React from "react";
import { AnnotationIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import UserAvatar from "../UserAvatar";
import moment from "moment";
import PostDropdown from "../dropdowns/PostDropdown";
import { getUser, isAdmin } from "../../api/Session";

function PostCard(props) {
  return (
    <div className="mt-4 p-3 bg-white border">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <UserAvatar
            link={props.data.authorAvatar}
            name={props.data.authorName}
          />
          <div className="grid">
            <Link
              to={`profile/${props.data.authorId}`}
              className="text-xl text-gray-600 font-medium"
            >
              {props.data.authorName}
            </Link>
            <span className="text-xs font-medium text-gray-400">
              {moment(props.data.createdAt).utcOffset(420).fromNow()}
            </span>
          </div>
        </div>
        {(getUser().id == props.data.authorId || isAdmin()) && (
          <PostDropdown id={props.data.postId} changed={props.changed} />
        )}
      </div>
      <div className="mt-2 mb-2">
        {props.data.filePath && (
          <Link to={`forum/${props.data.postId}`}>
            <img
              src={`http://127.0.0.1:8000/${props.data.filePath}`}
              className="border w-full max-h-96 object-cover"
            />
          </Link>
        )}
      </div>
      <div className="flex space-x-5 justify-between items-center">
        <p className="text-gray-600 w-full truncate">
          <span className="font-medium">{props.data.authorName}</span>{" "}
          {props.data.content}
        </p>
        <Link to={`forum/${props.data.postId}`}>
          <span className="flex items-center space-x-2 text-gray-500 font-medium">
            <span>{props.data.numberOfComments}</span>
            <AnnotationIcon className="w-5" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
