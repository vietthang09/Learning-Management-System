import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../api/API_User";
function Login() {
  var [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  var [errors, setErrors] = useState();
  function handleInput(e) {
    setLoginInfo({ ...loginInfo, [e.target.name]: [e.target.value] });
  }
  function handleSubmit() {
    login(loginInfo, setErrors);
  }
  return (
    <div className="bg-gray-100 w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-11/12 lg:w-1/4 py-5 rounded-md shadow">
        <p className="mb-5 text-2xl text-center text-gray-600">Welcome Back!</p>
        <div className="px-5 space-y-5">
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="text"
              className={
                errors
                  ? errors.email
                    ? "p-2 text-xl bg-gray-100 border rounded-md focus:outline-none ring-2 ring-red-400"
                    : "p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  : "p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              }
              name="email"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Password</label>
            <input
              className={
                errors
                  ? errors.password
                    ? "p-2 text-xl bg-gray-100 border rounded-md focus:outline-none ring-2 ring-red-400"
                    : "p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  : "p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              }
              type="password"
              name="password"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <button
            className="p-2 w-full bg-green-400 text-white font-semibold rounded-md hover:bg-green-500"
            id="button_login"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
