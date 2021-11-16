import React from "react";
import { AnnotationIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import moment from "moment";
function PostCard(props) {
  return (
    <div className="mt-4 p-3 bg-white border">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <UserAvatar link={props.data.authorAvatar} />
          <div className="grid">
            <span className="text-xl text-gray-600 font-medium">
              {props.data.authorName}
            </span>
            <span className="text-xs font-medium text-gray-400">
              {moment(props.data.createdAt).utcOffset(420).fromNow()}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2 mb-2">
        {props.data.filePath ? (
          <img
            src={"http://127.0.0.1:8000/" + props.data.filePath}
            className="rounded-md border w-full max-h-96 object-cover"
          />
        ) : (
          ""
        )}
      </div>
      <div className="flex space-x-5 justify-between items-center">
        <p className="text-gray-600 w-full truncate">{props.data.content}</p>
        <NavLink
          to={
            {
              // pathname: `/forum/${props.id}`,
            }
          }
        >
          <AnnotationIcon className="w-7 text-gray-500" />
        </NavLink>
      </div>
    </div>
  );
}

export default PostCard;
