import React from "react";
import UserAvatar from "../UserAvatar";
import moment from "moment";
import { getUser, isAdmin } from "../../api/Session";
import { deleteComment } from "../../api/API_Comments";

function CommentCard(props) {
  function confirm(e) {
    e.preventDefault();
    deleteComment(props.data.commentId);
    props.setAddComment(true);
  }
  return (
    <div className="p-3 space-x-3 flex comment">
      <UserAvatar link={props.data.authorAvatar} />
      <span>
        <span className="text-gray-600 font-medium">
          {getUser().id == props.data.authorId ? "You" : props.data.authorName}
        </span>
        <span className="text-gray-600">{" " + props.data.content}</span>
        {props.data.image ? (
          <img
            src={"http://localhost:8000/" + props.data.image}
            className="border w-44 h-44 object-cover"
          />
        ) : (
          ""
        )}
        <span className="block flex text-gray-400 text-xs font-medium space-x-3">
          <span>{moment(props.data.createdAt).utcOffset(420).fromNow()}</span>
          {getUser().id == props.data.authorId || isAdmin() ? (
            <button
              className="hidden button"
              onClick={(e) => {
                confirm(e);
              }}
            >
              <span className="text-red-400 font-medium cursor-pointer hover:text-red-500">
                Delete
              </span>
            </button>
          ) : (
            ""
          )}
        </span>
      </span>
    </div>
  );
}

export default CommentCard;
