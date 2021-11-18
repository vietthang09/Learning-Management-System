import React, { useState, useEffect } from "react";
import { getComments } from "../../api/API_Comments";
import CommentCard from "../cards/CommentCard";

function CommentList(props) {
  let [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(props.postId, setComments);
    props.setAddComment(false);
  }, [props.addComment]);
  return (
    <div>
      {comments.map((item, index) => {
        return (
          <CommentCard key={index} data={item} setAddComment={props.setAddComment} />
        );
      })}
    </div>
  );
}

export default CommentList;
