import React, { useState } from "react";
import { update } from "../api/API_Profile";

function ProfileForm(props) {
  var [user, setUser] = useState({
    name: props.data.name,
    email: props.data.email,
  });
  var [change, setChange] = useState(false);
  function handleInputInfo(e) {
    setUser({ ...user, [e.target.name]: [e.target.value] });
    setChange(true);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const thisButton = e.currentTarget;
    if (change) {
      thisButton.innerText = "Loading";
      update(user.name, user.email);
      thisButton.innerText = "Done";
      setTimeout(() => {
        thisButton.innerText = "Submit";
      }, 2000);
    }
  }
  return (
    <div className="w-1/2 m-auto mt-5 p-10 bg-white border">
      <img
        src={`http://localhost:8000/${props.data.avatar}`}
        className="w-16 h-16 object-cover rounded-full"
      />
      <div className="space-y-3">
        <div className="flex items-center">
          <label className="flex-1 text-lg text-gray-600 font-medium">
            Name
          </label>
          <input
            type="text"
            className="flex-1 p-2 text-xl bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            defaultValue={props.data.name}
            name="name"
            onChange={(e) => handleInputInfo(e)}
          />
        </div>
        <div className="flex items-center">
          <label className="flex-1 text-lg text-gray-600 font-medium">
            Email
          </label>
          <input
            type="text"
            className="flex-1 p-2 text-xl bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            defaultValue={props.data.email}
            name="email"
            onChange={(e) => handleInputInfo(e)}
          />
        </div>
        {/* <div className="flex items-center">
          <label className="flex-1 text-lg text-gray-600 font-medium">
            New Password
          </label>
          <input
            type="password"
            className="flex-1 p-2 text-xl bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="flex items-center">
          <label className="flex-1 text-lg text-gray-600 font-medium">
            Confirm New Password
          </label>
          <input
            type="password"
            className="flex-1 p-2 text-xl bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div> */}
        <button
          className="p-2 bg-green-400 text-white font-medium rounded-lg"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ProfileForm;
