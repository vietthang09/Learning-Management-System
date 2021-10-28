import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
function MaterialCard(props) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="px-5 py-2 w-full flex justify-between items-center bg-green-100 text-green-600 font-medium rounded-xl">
            <span>{props.title}</span>
            <div className="w-5">
              <ChevronRightIcon
                className={`${open ? "transform rotate-90" : ""}`}
              />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
            <div className="">hello</div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default MaterialCard;
