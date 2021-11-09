import axios from "axios";
import React, { useState, useEffect } from "react";
import ProfileForm from "../components/ProfileForm";
import { update } from "../api/API_Profile";
function ProfileEdit() {
  const userInLocal = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState([]);

  useEffect(() => {
    const formData = new FormData();
    formData.append("userId", userInLocal.id);
    const url = "http://localhost:8000/api/profile/view";
    axios({
      method: "post",
      url: url,
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }).then((response) => {
      if (response.data.status == 201) {
        setUser(response.data.user);
      } else {
        console.log("error");
      }
    });
  }, []);

  return (
    <div>
      <ProfileForm data={user} />
    </div>
  );
}

export default ProfileEdit;
