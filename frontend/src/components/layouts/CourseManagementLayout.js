import React, { useState } from "react";
import BackButton from "../buttons/BackButton";
import CoursesManagementList from "../lists/CoursesManagementList";

function CourseManagementLayout() {
  let [refresh, setRefresh] = useState(false);
  return (
    <div className="container m-auto mt-3 space-y-3">
      <div className="space-x-5">
        <BackButton />
      </div>
      <CoursesManagementList refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
}

export default CourseManagementLayout;
