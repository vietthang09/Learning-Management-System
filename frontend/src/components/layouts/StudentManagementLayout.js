import React, { useState } from "react";
import UserList from "../lists/UserList";

function StudentManagementLayout() {
  let [refresh, setRefresh] = useState(false);
  return (
    <div className="container m-auto mt-3">
      <UserList for="student" refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
}

export default StudentManagementLayout;
