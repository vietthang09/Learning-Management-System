import React, { useState, useEffect } from "react";
import StudentList from "../lists/UserList";

function StudentManagementLayout() {
  return (
    <div>
      <StudentList for="student" />
    </div>
  );
}

export default StudentManagementLayout;
