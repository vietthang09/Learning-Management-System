import React, { useState, useEffect } from "react";
import { getOwnPost } from "../../api/API_Forum";
import PostList from "../lists/PostList";
function OwnPostList(props) {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    getOwnPost(props.id, setposts);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      <PostList datas={posts} />
    </div>
  );
}

export default OwnPostList;
