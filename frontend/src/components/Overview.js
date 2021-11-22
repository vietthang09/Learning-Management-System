import React from "react";
import BoxNumber from "./BoxNumber/BoxNumber";

function Overview() {
  return (
    <>
      <span className="text-lg text-gray-600 font-medium">Overview</span>
      <div className="grid grid-cols-2 gap-4">
        <BoxNumber for="student" bg="green" />
        <BoxNumber for="teacher" bg="yellow" />
        <BoxNumber for="course" bg="blue" />
        <BoxNumber for="post" bg="red" />
      </div>
    </>
  );
}

export default Overview;
