import React from "react";
import { SunIcon } from "@heroicons/react/outline";
function Loading() {
  return (
    <div className="w-full">
      <SunIcon className="m-auto w-5 animate-spin text-gray-500" />
    </div>
  );
}

export default Loading;
