import React from "react";
import PostCard from "../PostCard";
function PostList(props) {
  return (
    <div className="w-1/2 m-auto">
      {props.datas.map((item, index) => {
        return <PostCard key={index} data={item} changed={props.changed} />;
      })}
    </div>
  );
}

export default PostList;
