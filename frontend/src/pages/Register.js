import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
function Register() {
  function register() {
    let name = document.getElementById("name").value;
    let role = document.getElementById("role").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password) {
      toast.error("Please fill in all the information");
    } else {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/auth/register",
        headers: { "Content-Type": "application/json" },
        data: {
          name: name,
          email: email,
          role: role,
          password: password,
        },
      }).then((response) => {
        console.log(response.data);
      });
    }
  }
  return (
    <div className="bg-gray-100 w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-11/12 lg:w-1/4 py-5 rounded-md shadow">
        <p className="mb-5 text-2xl text-center text-gray-600">Welcome Back!</p>
        <div className="px-5 space-y-5">
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Name</label>
            <input
              type="text"
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="name"
              id="name"
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Role</label>
            <input
              type="text"
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="role"
              id="role"
            />
          </div>
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
            onClick={register}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
