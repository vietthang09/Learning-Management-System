import React from "react";
import UserAvatar from "../UserAvatar";
import moment from "moment";
function CommentCard(props) {
  return (
    <div className="p-3 flex">
      <UserAvatar link={props.data.authorAvatar} />
      <span>
        <span className="text-gray-600 font-medium">
          {props.data.authorName + " "}
        </span>
        {props.data.content}
        <span className="block text-gray-400 text-xs font-medium">
          {moment(props.data.createdAt).utcOffset(420).fromNow()}
        </span>
      </span>
    </div>
  );
}

export default CommentCard;
