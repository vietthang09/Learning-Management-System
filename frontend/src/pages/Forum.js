import React, { useEffect } from "react";
import PostCard from "../components/PostCard";
import { PhotographIcon, XCircleIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import axios from "axios";
import { Link, NavLink, useHistory } from "react-router-dom";
function Forum() {
  const [isOpen, setIsOpen] = useState(false);
  var [posts, setPosts] = useState([]);
  var [postContent, setPostContent] = useState();
  var [selectedFile, setSelectedFile] = useState();
  var [url, setUrl] = useState();
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
  function setURL(file) {
    setUrl(URL.createObjectURL(file));
  }

  function removeImage() {
    setSelectedFile();
    setUrl();
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
                  src={"http://localhost:8000/" + user.avatar}
                  alt=""
                  className="w-10 h-10 object-cover rounded-full shadow mr-5"
                />
                <button
                  type="text"
                  className="w-full h-10 px-5 text-left bg-gray-50 text-xl text-gray-400 outline-none rounded-3xl shadow-inner hover:bg-gray-100"
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
          className="fixed inset-0 z-10 overflow-y-auto"
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
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                    <label htmlFor="file">
                      <PhotographIcon className="w-7 text-green-400 cursor-pointer" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        setSelectedFile(e.target.files[0]);
                        setURL(e.target.files[0]);
                      }}
                    />
                  </div>
                  {selectedFile ? (
                    <div className="relative w-24 h-24">
                      <img
                        src={url}
                        className="mt-2 w-24 h-24 object-cover rounded-lg"
                      />
                      <XCircleIcon
                        className="absolute -top-2 -right-2 w-7 text-red-400 cursor-pointer"
                        onClick={removeImage}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-400 border border-transparent rounded-md hover:bg-red-400 hover:text-white"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-400 bg-white shadow-md hover:shadow-inner rounded-md hover:bg-gray-50"
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
