import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import { getMaterialInfo } from "../../api/API_Materials";
import DeleteButton from "../buttons/DeleteButton";
import ConfirmButton from "../buttons/ConfirmButton";
import DisabledButton from "../buttons/DisabledButton";
function UpdateMaterialForm(props) {
  var [materialInfor, setMaterialInfor] = useState([]);
  var [selectedFile, setSelectedFile] = useState([]);
  useEffect(() => {
    getMaterialInfo(props.id, setMaterialInfor);
  }, []);
  function handleInput() {}
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Title</label>
        <input
          type="text"
          className="p-2 text-xl text-gray-600 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          name="assignmentTitle"
          defaultValue={materialInfor.materialTitle}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label className="text-sm text-gray-500">Content</label>
        <textarea
          className="p-2 text-xl text-gray-600 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          name="assignmentContent"
          defaultValue={materialInfor.materialContent}
          onChange={(e) => handleInput(e)}
        ></textarea>
      </div>
      <div className="grid grid-cols-1 gap-1">
        <label className="block text-sm text-gray-500">Attachment</label>
        <label className="block text-sm text-gray-500">
          You uploaded{" "}
          <a href="" className="underline">
            {materialInfor.fileName}
          </a>
        </label>
        <div className="flex items-center">
          <label
            htmlFor="file"
            className="text-green-400 font-semibold rounded-lg cursor-pointer hover:text-green-500"
          >
            {selectedFile.name ? selectedFile.name : "Choose file"}
          </label>
          <input
            type="file"
            className="hidden"
            id="file"
            name="file"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
            }}
          />
          {selectedFile.name ? (
            <TrashIcon
              className="w-7 text-red-400 border-2 border-red-400 rounded-full cursor-pointer hover:text-red-500 hover:border-red-500"
              onClickCapture={(e) => {
                e.preventDefault();
                setSelectedFile([]);
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <DeleteButton type="delete-material" id={props.id} />
        {selectedFile.name ? (
          <ConfirmButton
            type="update-material"
            id={props.id}
            data={materialInfor}
          />
        ) : (
          <DisabledButton />
        )}
      </div>
    </div>
  );
}

export default UpdateMaterialForm;
