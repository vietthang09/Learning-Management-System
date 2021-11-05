import { Disclosure } from "@headlessui/react";
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { Menu, Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
function MaterialCard(props) {
  let history = useHistory();
  let [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  let [label, setLabel] = useState("Choose a file");
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const deleteMaterial = async (e) => {
    const formData = new FormData();
    formData.append("materialId", props.data.id);
    await fetch("http://localhost:8000/api/teacher/material/delete", {
      method: "POST",
      body: formData,
    }).then((result) => {
      history.push("/");
      history.replace("/courses/" + props.courseId);
    });
  };

  const update = async () => {
    const formData = new FormData();
    formData.append("materialId", props.data.id);
    formData.append("title", document.getElementById("title").value);
    formData.append("content", document.getElementById("content").value);
    formData.append("file", selectedFile);
    formData.append("fileName", selectedFile.name);
    await fetch("http://localhost:8000/api/teacher/material/update", {
      method: "POST",
      body: formData,
    }).then((result) => {
      history.push("/");
      history.replace("/courses/" + props.courseId);
    });
  };
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="px-5 py-2 w-full flex justify-between items-center bg-green-100 text-green-600 font-medium rounded-xl">
            <span>{props.data.material_title}</span>
            <div className="w-5">
              <ChevronRightIcon
                className={`${open ? "transform rotate-90" : ""}`}
              />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
            <div className="p-2 flex shadow rounded-xl">
              <div>
                <p>{props.data.material_content}</p>
                Attachment:{" "}
                <a
                  className="underline"
                  href={
                    "http://127.0.0.1:8000/api/material/download/" +
                    props.data.id
                  }
                >
                  {props.data.fileName}
                </a>
              </div>
              {user.role == 1 ? (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      <DotsVerticalIcon className="w-5 text-dark" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          <button
                            type="button"
                            onClick={openModal}
                            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                            Edit
                          </button>
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                              onClick={(e) => deleteMaterial(e)}
                            >
                              {active ? (
                                <TrashIcon
                                  className="w-5 h-5 mr-2 text-violet-400"
                                  aria-hidden="true"
                                />
                              ) : (
                                <TrashIcon
                                  className="w-5 h-5 mr-2 text-violet-400"
                                  aria-hidden="true"
                                />
                              )}
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                ""
              )}
            </div>
          </Disclosure.Panel>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={closeModal}
            >
              <div className="min-h-screen px-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>

                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      <input
                        type="text"
                        id="title"
                        defaultValue={props.data.material_title}
                      />
                    </Dialog.Title>
                    <div className="mt-2">
                      <textarea
                        id="content"
                        defaultValue={props.data.material_content}
                      ></textarea>
                      <span>{props.data.fileName}</span>
                      <input
                        type="file"
                        id="file"
                        className="inputfile"
                        onChange={(e) => {
                          setLabel(e.target.files[0].name);
                          setSelectedFile(e.target.files[0]);
                        }}
                      />
                      <label
                        htmlFor="file"
                        id="label"
                        className="py-2 font-medium text-green-400"
                      >
                        {label}
                      </label>
                      <button
                        className="text-white font-bold bg-green-400 p-2"
                        onClick={update}
                      >
                        Cofirm
                      </button>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export default MaterialCard;
