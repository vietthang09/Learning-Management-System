import React, { useState } from "react";
import AddUserButton from "../buttons/AddUserButton";
import BackButton from "../buttons/BackButton";
import UserList from "../lists/UserList";

function TeacherManagementLayout() {
  let [refresh, setRefresh] = useState(false);
  return (
    <div className="container m-auto mt-3 space-y-3">
      <div className="space-x-5">
        <BackButton />
        <AddUserButton for="teacher" setRefresh={setRefresh} />
      </div>
      <UserList for="teacher" refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
}

export default TeacherManagementLayout;
