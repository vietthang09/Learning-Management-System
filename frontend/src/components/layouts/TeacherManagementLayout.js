import React, { useState } from "react";
import UserList from "../lists/UserList";

function TeacherManagementLayout() {
  let [refresh, setRefresh] = useState(false);
  return (
    <div className="container m-auto mt-3">
      <UserList for="teacher" refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
}

export default TeacherManagementLayout;
