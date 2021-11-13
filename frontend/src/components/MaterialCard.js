import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon, AdjustmentsIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import { isTeacher } from "../api/Session";
function MaterialCard(props) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="px-5 py-2 w-full flex justify-between items-center bg-green-100 text-green-600 font-medium rounded-xl">
            <span>{props.data.materialTitle}</span>
            <div className="w-5">
              <ChevronRightIcon
                className={`${open ? "transform rotate-90" : ""}`}
              />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 bg-white">
            <div className="p-2 flex justify-between items-center shadow rounded-xl">
              <div>
                <p>{props.data.materialContent}</p>
                Attachment:{" "}
                <a
                  className="hover:underline"
                  href={
                    "http://127.0.0.1:8000/api/material/download/" +
                    props.data.materialId
                  }
                >
                  {props.data.fileName}
                </a>
              </div>
              {isTeacher() ? (
                <Link to={"/material/update/" + props.data.materialId}>
                  <AdjustmentsIcon className="w-7 text-green-400 hover:text-green-500" />
                </Link>
              ) : (
                ""
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default MaterialCard;
