import React, { useEffect } from "react";
import PostCard from "../components/PostCard";
import { PhotographIcon, DocumentIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import axios from "axios";
import { Link, NavLink, useHistory } from "react-router-dom";
function Forum() {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));

  function loadPosts() {
    axios.get("http://127.0.0.1:8000/api/posts").then((res) => {
      setPosts(res.data.posts);
    });
  }
  useEffect(() => {
    loadPosts();
  }, []);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  async function handleSubmit(e) {
    const thisClicked = e.currentTarget;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("user_id", user.id);
    formData.append("content", postContent);
    thisClicked.innerText = "Posting";
    await fetch("http://localhost:8000/api/posts/new", {
      method: "POST",
      body: formData,
    }).then(() => {
      history.push("/");
      history.replace("/forum");
      loadPosts();
      closeModal();
    });
  }
  return (
    <div className="container m-auto mt-5">
      <div className="flex justify-center flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="px-1 lg:px-10">
            {/* Post Box */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-3 flex space-x-1 items-center">
                <img
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                  className="w-10 mr-5"
                />
                <button
                  type="text"
                  className="w-full h-10 px-5 text-left bg-gray-100 text-xl text-gray-400 outline-none rounded-3xl shadow-inner hover:bg-gray-200"
                  onClick={openModal}
                >
                  What's on your mind, Stark?
                </button>
              </div>
            </div>

            {/* End Post Box */}

            {/* Post List */}
            <div>
              {posts.map((item, index) => {
                return <PostCard id={item.id} />;
              })}
            </div>
            {/* End Post List */}
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-blur-sm"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
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
                  className="text-lg text-center font-medium leading-6 text-gray-900"
                >
                  Create post
                </Dialog.Title>
                <div className="mt-2">
                  <textarea
                    className="w-full outline-none resize-none text-lg text-gray-900"
                    placeholder="What's in your mind, Stark?"
                    onChange={(e) => {
                      setPostContent(e.target.value);
                    }}
                  ></textarea>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center p-2 rounded-xl border">
                    <span className="text-sm text-gray-400 ">
                      Add to your Post
                    </span>
                    <PhotographIcon className="w-7 text-green-400" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setSelectedFile(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-400 border border-transparent rounded-md hover:bg-green-200"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-500 bg-green-100 border border-transparent rounded-md hover:bg-green-200"
                      onClick={handleSubmit}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default Forum;
