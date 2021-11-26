import React, { useState } from "react";
import { login } from "../../api/API_User";
import ErrorText from "../ErrorText";
import { useHistory } from "react-router-dom";
import LoadingButton from "../buttons/LoadingButton";
function LoginForm() {
  // States
  const history = useHistory();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);
  const [loading, setloading] = useState(false);
  const [errors, seterrors] = useState([]);
  //   End States

  //   Funtions
  function handleInput(e) {
    setLoginInfo({ ...loginInfo, [e.target.name]: [e.target.value] });
  }
  function handleSubmit() {
    login(loginInfo, remember, seterrors, setloading, history);
  }
  function handlePress(e) {
    if (e.key === "Enter") {
      login(loginInfo, remember, seterrors, setloading, history);
    }
  }
  //   End Funtions
  return (
    <div className="bg-gray-100 w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-11/12 lg:w-1/4 py-5 rounded-md shadow">
        <p className="mb-5 text-2xl text-center text-gray-600">Welcome Back!</p>
        <div className="px-5 space-y-5">
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="text"
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="email"
              onChange={(e) => handleInput(e)}
              onKeyPress={handlePress}
            />
            {errors.email && <ErrorText text={errors.email} />}
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Password</label>
            <input
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              type="password"
              name="password"
              onChange={(e) => handleInput(e)}
              onKeyPress={handlePress}
            />
            {errors.password && <ErrorText text={errors.password} />}
          </div>
          <div className="flex items-center space-x-3">
            <input
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none"
              type="checkbox"
              defaultChecked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label className="text-sm text-gray-500">Remeber me</label>
          </div>
          {loading ? (
            <LoadingButton width="w-full" />
          ) : (
            <button
              className="p-2 w-full bg-green-400 text-white font-semibold rounded-md hover:bg-green-500 focus:outline-none"
              onClick={handleSubmit}
            >
              Login
            </button>
          )}
          {errors.error && <ErrorText text={errors.error} />}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
