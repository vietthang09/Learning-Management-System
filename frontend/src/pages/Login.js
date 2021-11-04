import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  let history = useHistory();
  if (localStorage.getItem("token")) {
    history.push("/");
  }
  const login = () => {
    console.log(user);
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/auth/login",
      headers: { "Content-Type": "application/json" },
      data: {
        email: user.email,
        password: user.password,
      },
    }).then((response) => {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      history.push("/");
    });
  };
  return (
    <div>
      Email:
      <input
        type="text"
        className="border"
        name="email"
        onChange={(e) => onInputChange(e)}
      />
      Password:
      <input
        type="password"
        className="border"
        name="password"
        onChange={(e) => onInputChange(e)}
      />
      <button className="p-3 bg-green-400" onClick={login}>
        Login
      </button>
    </div>
  );
}

export default Login;
