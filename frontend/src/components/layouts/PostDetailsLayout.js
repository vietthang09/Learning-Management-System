import React, { useState, useEffect } from "react";
import { getPost } from "../../api/API_Forum";
import CreateCommentForm from "../forms/CreateCommentForm";
import UserAvatar from "../UserAvatar";
import moment from "moment";
import CommentList from "../lists/CommentList";
import { getUser } from "../../api/Session";
import PostDropdown from "../dropdowns/PostDropdown";
function PostDetailsLayout(props) {
  const postId = props.match.params.id;
  let [post, setPost] = useState([]);
  let [addComment, setAddComment] = useState(false);
  useEffect(() => {
    getPost(postId, setPost);
  }, []);
  return (
    <div>
      <div className="m-auto mt-5 mb-5 h-full w-2/3 flex border divide-x divide-gray-100">
        <div className="flex-2 flex items-center">
          {post.image ? (
            <img
              src={"http://127.0.0.1:8000/" + post.image}
              className="w-full h-96 object-cover"
            />
          ) : (
            <span className="m-auto text-gray-400 font-medium uppercase tracking-widest">
              No Image
            </span>
          )}
        </div>
        <div className="relative flex-1 bg-white divide-y divide-gray-200">
          <div className="p-3 flex justify-between items-center">
            <div className="flex items-center">
              <UserAvatar link={post.authorAvatar} name={post.authorName} />
              <span className="text-gray-600 font-medium">
                {post.authorName}
              </span>
            </div>
            <div>
              {getUser().id == post.authorId && (
                <PostDropdown id={postId} goback={true} />
              )}
            </div>
          </div>
          <div className="mb-16 h-96 overflow-y-scroll hidescroll">
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
          <div className="absolute bottom-0 w-full bg-white">
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
