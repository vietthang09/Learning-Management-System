import React, { useState } from "react";
import { getUser } from "../api/Session";
import ConfirmButton from "./buttons/ConfirmButton";
import DisabledButton from "./buttons/DisabledButton";
import { PhotographIcon } from "@heroicons/react/outline";
function ProfileForm() {
  var [user, setUser] = useState({
    name: getUser().name,
    email: getUser().email,
  });
  var [selectedImage, setSelectedImage] = useState([]);
  var [change, setChange] = useState(false);
  function handleInputInfo(e) {
    setUser({ ...user, [e.target.name]: [e.target.value] });
    setChange(true);
  }
  return (
    <div className="w-1/2 m-auto mt-5 p-10 bg-white border">
      <div className="relative w-36">
        {selectedImage.name ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            className="w-36 h-36 object-cover rounded-full border"
          />
        ) : (
          <img
            src={"http://localhost:8000/" + getUser().avatar}
            className="w-36 h-36 object-cover rounded-full border"
          />
        )}
        <label htmlFor="image">
          <PhotographIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 text-gray-100 cursor-pointer hover:text-gray-200" />
        </label>
        <input
          type="file"
          id="image"
          className="hidden"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-center">
          <label className="flex-1 text-lg text-gray-600 font-medium">
            Name
          </label>
          <input
            type="text"
            className="flex-1 p-2 text-xl bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            defaultValue={getUser().name}
            name="name"
            onChange={(e) => {
              handleInputInfo(e);
              setChange(true);
            }}
          />
        </div>
        <div className="flex items-center">
          <label className="flex-1 text-lg text-gray-600 font-medium">
            Email
          </label>
          <input
            type="text"
            className="flex-1 p-2 text-xl bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            defaultValue={getUser().email}
            name="email"
            onChange={(e) => {
              handleInputInfo(e);
              setChange(true);
            }}
          />
        </div>
        {change || selectedImage.name ? (
          <ConfirmButton
            type="update-profile"
            data={user}
            file={selectedImage}
          />
        ) : (
          <DisabledButton />
        )}
      </div>
    </div>
  );
}

export default ProfileForm;
