import React, { useState } from "react";
import UserAvatar from "../UserAvatar";
import { getUser } from "../../api/Session";
import { PhotographIcon } from "@heroicons/react/outline";
import ConfirmButton from "../buttons/ConfirmButton";
import DisabledButton from "../buttons/DisabledButton";
function CreatePostForm() {
  let [content, setContent] = useState();
  let [image, setImage] = useState([]);
  return (
    <div>
      <UserAvatar link={getUser().avatar} />
      <textarea
        className="w-full text-2xl resize-none focus:outline-none"
        placeholder={"What's on your mind, " + getUser().name + " ?"}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      {image.name ? (
        <div className="w-full max-h-64 overflow-y-scroll scroll-styled">
          <img src={URL.createObjectURL(image)} />{" "}
        </div>
      ) : (
        ""
      )}
      <div className="mb-5 p-3 flex justify-between border rounded-lg">
        <span className="text-gray-600 font-medium">Add to your post</span>
        <div>
          <input
            id="image"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <label htmlFor="image">
            <PhotographIcon className="w-7 text-green-400 cursor-pointer hover:text-green-500 " />
          </label>
        </div>
      </div>
      {content || image.name ? (
        <ConfirmButton type="create-post" data={content} file={image} />
      ) : (
        <DisabledButton />
      )}
    </div>
  );
}

export default CreatePostForm;
