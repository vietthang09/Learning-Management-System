import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmButton from "../buttons/ConfirmButton";
import DisabledButton from "../buttons/DisabledButton";
function CreateMaterialForm(props) {
  const [materialInfo, setMaterialInfo] = useState({
    title: "",
    content: "",
  });
  const [selectedFile, setSelectedFile] = useState([]);
  function handleInput(e) {
    setMaterialInfo({ ...materialInfo, [e.target.name]: [e.target.value] });
  }
  return (
    <div>
      <div className="py-5 flex space-x-10">
        <div className="flex-1">
          <p className="text-2xl text-gray-600">Basics</p>
          <span className="text-sm text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur consequuntur qui nobis impedit expedita distinctio
            officia laborum beatae quis delectus!
          </span>
        </div>
        <div className="flex-2 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Title</label>
            <input
              type="text"
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="title"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Content</label>
            <textarea
              type="text"
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              name="content"
              onChange={(e) => handleInput(e)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="pt-5 flex space-x-10">
        <div className="flex-1 space-y-5">
          <div>
            <p className="text-2xl text-gray-600">Image</p>
            <span className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
              eligendi?
            </span>
          </div>
          {selectedFile.name ? (
            <ConfirmButton
              type="create-material"
              id={props.id}
              data={materialInfo}
              file={selectedFile}
            />
          ) : (
            <DisabledButton />
          )}
        </div>
        <div className="flex-2">
          <div>
            <label className="block mb-5 text-sm text-gray-500">
              Attachment
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
        </div>
      </div>
    </div>
  );
}

export default CreateMaterialForm;
