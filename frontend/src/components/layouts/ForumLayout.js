import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getPosts } from "../../api/API_Forum";
import PostList from "../lists/PostList";
import CreatePostForm from "../forms/CreatePostForm";
import UserAvatar from "../UserAvatar";
import { getUser } from "../../api/Session";

function ForumLayout() {
  let [posts, setPosts] = useState([]);
  let [changed, setChanged] = useState(false);
  useEffect(() => {
    getPosts(setPosts);
    setChanged(false);
  }, [changed]);
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <div className="mt-5 p-5 m-auto flex items-center bg-white shadow rounded-lg">
          <UserAvatar link={getUser().avatar} name={getUser().name} />
          <p
            className="p-3 w-full text-lg text-gray-500 cursor-pointer hover:bg-gray-50 shadow-inner rounded-lg"
            onClick={openModal}
          >
            What's on your mind, {getUser().name} ?{" "}
          </p>
        </div>
        <div>
          <PostList datas={posts} changed={setChanged} />
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
                <div className="mt-2">
                  <CreatePostForm changed={setChanged} open={setIsOpen} />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ForumLayout;
