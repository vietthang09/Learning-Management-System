import React from "react";
import CreateMaterialForm from "../forms/CreateMaterialForm";
import { useHistory } from "react-router";
function MaterialLayout(props) {
  const courseId = props.match.params.id;
  const history = useHistory();
  return (
    <div className="w-full px-5 lg:px-0 container m-auto">
      <div className="flex justify-between items-center py-10">
        <p className="font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest uppercase">
          material
        </p>
        <button
          className="text-gray-600 font-semibold"
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          go back
        </button>
      </div>
      <CreateMaterialForm id={courseId} />
    </div>
  );
}

export default MaterialLayout;
