import React from "react";

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
          {props.name.charAt(0)}
        </div>
      )}
    </>
  );
}

export default UserAvatar;
