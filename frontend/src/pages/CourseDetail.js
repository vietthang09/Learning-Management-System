import React, { Fragment } from "react";
import { Disclosure, Tab } from "@headlessui/react";
import AssignmentCard from "../components/AssignmentCard";
import { ChevronRightIcon } from "@heroicons/react/outline";
import MaterialCard from "../components/MaterialCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CourseDetail() {
  return (
    <div className="container  m-auto mt-5">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-2/3 order-2 lg:order-1">
          <div className="p-5">
            <Tab.Group>
              <Tab.List className="flex justify-between">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-32 py-2",
                      selected
                        ? "bg-green-400 text-white"
                        : "bg-white text-black"
                    )
                  }
                >
                  Materials
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-32 py-2",
                      selected
                        ? "bg-green-400 text-white"
                        : "bg-white text-black"
                    )
                  }
                >
                  Assignments
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel className="mt-5 space-y-2">
                  <MaterialCard />
                  <MaterialCard />
                  <MaterialCard />
                </Tab.Panel>
                <Tab.Panel className="mt-5">
                  <AssignmentCard />
                  <AssignmentCard />
                  <AssignmentCard />
                  <AssignmentCard />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
        <div className="w-full lg:w-1/3 order-1 lg:order-2">
          <div className="p-3 shadow">
            <img
              src="https://cdn.tgdd.vn/hoi-dap/1216572/tri-tue-nhan-tao-ai-la-gi-cac-ung-dung-va-tiem-nan-11-800x450.jpg"
              alt=""
              className="rounded-xl"
            />
            <div className="mb-2">
              <p className="text-2xl font-bold">Subject title</p>
              <p className="text-gray-700 text-lg font-medium">
                Teacher's name
              </p>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci eveniet dolores aspernatur error ea doloremque
                doloribus numquam molestias molestiae, officiis laudantium,
                tempora placeat dolorem quam, facere sint? Laboriosam, illo qui?
              </p>
            </div>
            <div className="flex justify-center">
              <a
                className="mt-5 mb-10 px-16 py-2 text-green-500 bg-green-100 rounded-xl"
                href=""
              >
                Join online class
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
