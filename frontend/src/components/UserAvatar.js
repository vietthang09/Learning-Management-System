import React from "react";

function UserAvatar(props) {
  return (
    <img
      src={"http://localhost:8000/" + props.link}
      className="w-10 h-10 mr-3 object-cover rounded-full shadow"
    />
  );
}

export default UserAvatar;
