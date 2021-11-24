import React from "react";
import { SunIcon } from "@heroicons/react/outline";
function LoadingButton(props) {
  return (
    <button
      className={`p-2 w-full ${props.bg} text-white font-semibold rounded-md cursor-not-allowed focus:outline-none `}
    >
      <SunIcon className="m-auto w-6 animate-spin" />
    </button>
  );
}

export default LoadingButton;
