import React from "react";
import { DocumentSearchIcon } from "@heroicons/react/outline";
function Blank() {
  return (
    <div className="w-full flex justify-center text-gray-500">
      <div>
        <DocumentSearchIcon className="m-auto w-16 p-2 border-2 rounded-full" />
        <span className="text-3xl">Nothing Here</span>
      </div>
    </div>
  );
}

export default Blank;
