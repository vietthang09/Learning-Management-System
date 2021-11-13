import React, { useState, useEffect } from "react";
import { getPosts } from "../../api/API_Forum";
import PostList from "../lists/PostList";

function ForumLayout() {
  var [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts(setPosts);
  }, []);
  return (
    <div>
      <PostList datas={posts} />
    </div>
  );
}

export default ForumLayout;
