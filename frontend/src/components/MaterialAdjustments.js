import axios from "axios";
import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
function MaterialAdjustments(props) {
  const materialId = props.match.params.id;
  var location = useLocation();
  var history = useHistory();
  var [label, setLabel] = useState("Choose a file");
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const updateMaterial = async () => {
    let file = document.getElementById("file").files[0];
    var formData = new FormData();
    formData.append("materialId", materialId);
    formData.append("title", document.getElementById("title").value);
    formData.append("content", document.getElementById("content").value);
    file ? formData.append("file", file) : formData.append("file", "");
    axios({
      method: "POST",
      url: "http://localhost:8000/api/teacher/material/update",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    }).then((response) => {
      if (response.data.status == 201) {
        toast.info("Done! Going back to the course");
        setTimeout(() => {
          history.goBack();
        }, 3000);
      } else {
        toast.error("Something went wrong, please try again!");
      }
    });
  };
  const deleteMaterial = async () => {
    closeModal();
    axios({
      method: "post",
      url: "http://localhost:8000/api/teacher/material/delete",
      headers: { "Content-Type": "application/json" },
      data: {
        materialId: materialId,
      },
    }).then((result) => {
      if (result.data.status == 201) {
        toast.info("Done! Going back to the course");
        setTimeout(() => {
          history.goBack();
        }, 3000);
      } else {
        toast.error("Something went wrong, please try again!");
      }
    });
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-full lg:w-1/2 px-5 lg:px-0">
        <div className="flex justify-between items-center py-10">
          <p className="font-semibold text-xl lg:text-3xl text-gray-600 tracking-widest">
            UPDATE MATERIAL
          </p>
          <button
            className="text-gray-600 font-semibold"
            onClick={() => {
              history.goBack();
            }}
          >
            in {location.state.courseTitle}
          </button>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Title</label>
            <input
              type="text"
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="title"
              id="title"
              defaultValue={location.state.title}
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">Content</label>
            <textarea
              className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              name="content"
              id="content"
              defaultValue={location.state.content}
            ></textarea>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label className="text-sm text-gray-500">File</label>
            <input
              type="file"
              id="file"
              className="inputfile"
              onChange={(e) => {
                setLabel(e.target.files[0].name);
                // setSelectedFile(e.target.files[0]);
              }}
            />
            <label
              htmlFor="file"
              id="label"
              className="py-2 font-medium text-green-400"
            >
              {label}
            </label>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <button
              className="mt-5 p-2 w-full bg-green-400 text-white font-semibold rounded-md hover:bg-green-500"
              onClick={updateMaterial}
            >
              Confirm
            </button>
            <button
              className="p-2 w-full text-right text-red-400 font-semibold"
              onClick={openModal}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
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

            {/* This element is to trick the browser into centering the modal contents. */}
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
                  className="text-lg font-medium leading-6 text-yellow-400"
                >
                  Warning !
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    All student work will be lost, do you still want to
                    continue?
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-400 "
                    onClick={(closeModal, deleteMaterial)}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-400 bg-green-100 border border-transparent rounded-md"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

export default MaterialAdjustments;
