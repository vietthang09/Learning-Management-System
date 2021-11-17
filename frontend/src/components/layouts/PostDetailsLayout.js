import React, { useState, useEffect } from "react";
import { getPost } from "../../api/API_Forum";
import CreateCommentForm from "../forms/CreateCommentForm";
import UserAvatar from "../UserAvatar";
import moment from "moment";
import CommentList from "../lists/CommentList";
function PostDetailsLayout(props) {
  const postId = props.match.params.id;
  let [post, setPost] = useState([]);
  let [addComment, setAddComment] = useState(false);
  useEffect(() => {
    getPost(postId, setPost);
  }, []);
  return (
    <div>
      <div className="m-auto mt-5 mb-5 h-full w-2/3 flex bg-white border">
        <div className="flex-2">
          <img
            src={"http://127.0.0.1:8000/" + post.image}
            className=" w-full h-full object-cover"
          />
        </div>
        <div className="relative flex-1 divide-y divide-gray-200">
          <div className="p-3 flex items-center">
            <UserAvatar link={post.authorAvatar} />
            <span className="text-gray-600 font-medium">{post.authorName}</span>
          </div>
          <div>
            <div className="p-3 flex">
              <UserAvatar link={post.authorAvatar} />
              <span>
                <span className="text-gray-600 font-medium">
                  {post.authorName + " "}
                </span>
                {post.content}
                <span className="block text-gray-400 text-xs font-medium">
                  {moment(post.createdAt).utcOffset(420).fromNow()}
                </span>
              </span>
            </div>
            <CommentList
              postId={postId}
              addComment={addComment}
              setAddComment={setAddComment}
            />
          </div>
          <div className="">
            <CreateCommentForm
              postId={postId}
              addComment={addComment}
              setAddComment={setAddComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailsLayout;
