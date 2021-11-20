import React, { useState } from "react";
import AddUserModel from "../models/AddUserModel";

function AddUserButton(props) {
  let [isOpen, setIsOpen] = useState(false);
  function openModel(e) {
    e.preventDefault();
    setIsOpen(true);
  }
  return (
    <>
      <button
        className="p-3 bg-green-400 text-white font-medium rounded-md hover:bg-green-500"
        onClick={(e) => openModel(e)}
      >
        Add one
      </button>
      <AddUserModel
        for={props.for}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setRefresh={props.setRefresh}
      />
    </>
  );
}

export default AddUserButton;
