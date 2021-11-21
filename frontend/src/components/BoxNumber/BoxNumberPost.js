import React, { useState, useEffect } from "react";
import { countOfAdmin } from "../../api/API_Forum";

function BoxNumberPost() {
  const [today, setToday] = useState(0);
  const [yesterday, setYesterday] = useState(0);
  useEffect(() => {
    countOfAdmin(setToday, setYesterday);
  }, []);
  return <div>Today: {today}</div>;
}

export default BoxNumberPost;
