import React, { useState, useEffect } from "react";
import { getMaterialInCourse } from "../../api/API_Materials";
import MaterialCard from "../MaterialCard";
function MaterialList(props) {
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    getMaterialInCourse(props.id, setMaterials);
  }, []);
  return (
    <div>
      {materials.map((item, index) => {
        return <MaterialCard key={index} data={item} />;
      })}
    </div>
  );
}

export default MaterialList;
