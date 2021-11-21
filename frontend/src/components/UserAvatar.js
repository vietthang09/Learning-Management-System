import React from "react";
import { UserIcon } from "@heroicons/react/outline";
function UserAvatar(props) {
  return (
    <>
      {props.link ? (
        <img
          src={"http://localhost:8000/" + props.link}
          className="w-10 h-10 mr-3 object-cover rounded-full shadow"
        />
      ) : (
        <div className="bg-green-400 text-white font-medium text-3xl h-10 w-10 rounded-full flex justify-center uppercase">
          <UserIcon className="w-5 text-white" />
        </div>
      )}
    </>
  );
}

export default UserAvatar;
