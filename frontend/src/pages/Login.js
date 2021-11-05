import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  let history = useHistory();
  if (localStorage.getItem("token")) {
    history.push("/");
  }
  const login = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password) {
      toast.error("Please fill in all the information");
    } else {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/auth/login",
        headers: { "Content-Type": "application/json" },
        data: {
          email: email,
          password: password,
        },
      }).then((response) => {
        if (response.data.status == 200) {
          toast.error("Account does not exist");
        } else {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          history.push("/");
        }
      });
    }
  };
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
              id="email"
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Password</label>
            <input
              type="password"
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="password"
              id="password"
            />
          </div>
          <button
            className="p-2 w-full bg-green-400 text-white font-semibold rounded-md hover:bg-green-500"
            id="button_login"
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

export default Login;
