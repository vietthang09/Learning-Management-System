import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon, AdjustmentsIcon } from "@heroicons/react/outline";
import { Menu, Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
function MaterialCard(props) {
  const user = JSON.parse(localStorage.getItem("user"));
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
            <div className="p-2 flex justify-between items-center shadow rounded-xl">
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
                <NavLink
                  to={{
                    pathname: "/update-material/" + props.data.id,
                    state: {
                      courseId: props.courseId,
                      courseTitle: props.courseTitle,
                      title: props.data.material_title,
                      content: props.data.material_content,
                      fileName: props.data.fileName,
                    },
                  }}
                >
                  <AdjustmentsIcon className="w-5" />
                </NavLink>
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
