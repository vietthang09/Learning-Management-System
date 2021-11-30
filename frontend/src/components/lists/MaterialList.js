import React, { useState, useEffect } from "react";
import { getMaterialInCourse } from "../../api/API_Materials";
import MaterialCard from "../MaterialCard";
import Loading from "../Loading";
import Blank from "../Blank";
function MaterialList(props) {
  const [materials, setMaterials] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getMaterialInCourse(props.id, setloading, setMaterials);
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : materials.length >= 1 ? (
        materials.map((item, index) => {
          return <MaterialCard key={index} data={item} />;
        })
      ) : (
        <Blank />
      )}
    </div>
  );
}

export default MaterialList;
