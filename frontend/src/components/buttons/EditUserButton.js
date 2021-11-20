import React, { useState } from "react";
import EditUserModal from "../models/EditUserModal";
function EditUserButton(props) {
  let [isOpen, setIsOpen] = useState(false);
  function openModel(e) {
    e.preventDefault();
    setIsOpen(true);
  }
  return (
    <>
      <button
        className="text-right text-sm font-medium text-green-400 hover:text-green-500"
        onClick={(e) => openModel(e)}
      >
        Edit
      </button>
      <EditUserModal
        data={props.data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setRefresh={props.setRefresh}
      />
    </>
  );
}

export default EditUserButton;
