import React, { useEffect } from "react";
import { logout } from "../api/API_User";

function Unactive() {
  useEffect(() => {
    logout();
  }, []);
  return (
    <>
      <img src="./assets/img/503-Error.svg" className="w-1/3 m-auto" />
      <p className="text-center text-3xl text-gray-500 font-medium uppercase">
        Your account is locked!
      </p>
    </>
  );
}

export default Unactive;
