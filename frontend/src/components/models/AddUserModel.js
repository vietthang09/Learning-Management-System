import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { addStudent, addTeacher } from "../../api/API_User";
function AddUserModel(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  function handleInput(e) {
    setUser({ ...user, [e.target.name]: [e.target.value] });
  }
  function confirm(e) {
    e.preventDefault();
    if (props.for == "student") {
      addStudent(user);
    } else {
      addTeacher(user);
    }
    props.setIsOpen(false);
    props.setRefresh(true);
  }
  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {
            props.setIsOpen(false);
          }}
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
                  Add one
                </Dialog.Title>
                <div className="mt-2">
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-sm text-gray-500">Name</label>
                      <input
                        type="text"
                        className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        name="name"
                        onChange={(e) => {
                          handleInput(e);
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <label className="text-sm text-gray-500">Email</label>
                      <input
                        type="text"
                        className="p-2 text-xl bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        name="email"
                        onChange={(e) => {
                          handleInput(e);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    className="p-2 bg-green-400 text-white font-semibold rounded-md hover:bg-green-500"
                    onClick={(e) => confirm(e)}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AddUserModel;
