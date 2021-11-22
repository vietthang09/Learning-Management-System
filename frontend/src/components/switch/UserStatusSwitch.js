import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { changeUserStatus } from "../../api/API_User";
function UserStatusSwitch(props) {
  const [enabled, setEnabled] = useState(props.status == 0 ? false : true);
  console.log(props.status);
  return (
    <Switch
      checked={enabled}
      onChange={() => {
        setEnabled(!enabled);
        changeUserStatus(props.id);
      }}
      className={`${
        enabled ? "bg-green-500" : "bg-gray-200"
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white rounded-full`}
      />
    </Switch>
  );
}

export default UserStatusSwitch;
