import React, { useState } from "react";
import AddUserButton from "../buttons/AddUserButton";
import BackButton from "../buttons/BackButton";
import UserList from "../lists/UserList";

function StudentManagementLayout() {
  let [refresh, setRefresh] = useState(false);
  return (
    <div className="container m-auto mt-3 space-y-3">
      <div className="space-x-5">
        <BackButton />
        <AddUserButton for="student" setRefresh={setRefresh} />
      </div>
      <UserList for="student" refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
}

export default StudentManagementLayout;
