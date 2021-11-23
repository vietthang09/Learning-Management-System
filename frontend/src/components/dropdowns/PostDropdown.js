import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
  DotsVerticalIcon,
} from "@heroicons/react/outline";
import { deletePost } from "../../api/API_Forum";
import { useHistory } from "react-router";

function PostDropdown(props) {
  const history = useHistory();
  function confirmDelete(e) {
    e.preventDefault();
    deletePost(props.id);
    if (props.goback) {
      history.push("/forum");
    } else {
      props.changed(true);
    }
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-end w-full px-4 py-2 text-sm font-medium text-dark focus:outline-none">
          <DotsVerticalIcon
            className="w-5 h-5 -mr-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 w-44 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-green-50 text-green-400" : "text-gray-600"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm font-medium`}
                >
                  <PencilIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-red-50 text-red-400" : "text-gray-600"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm font-medium`}
                  onClick={(e) => {
                    confirmDelete(e);
                  }}
                >
                  <TrashIcon className="w-5 h-5 mr-2" />
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default PostDropdown;
