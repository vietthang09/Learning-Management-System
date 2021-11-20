import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";
import { useState } from "react";
function BackButton() {
  const history = useHistory();
  function handleClick(e) {
    e.preventDefault();
    history.goBack();
  }
  return (
    <button
      className="p-3 border border-green-400 rounded-full group hover:bg-green-400"
      onClick={(e) => handleClick(e)}
    >
      <ArrowLeftIcon className="w-5 text-green-400 group-hover:text-white" />
    </button>
  );
}

export default BackButton;
