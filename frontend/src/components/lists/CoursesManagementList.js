import React, { useState, useEffect } from "react";
import { getCourses } from "../../api/API_Courses";
import DeleteCourseButton from "../buttons/DeleteCourseButton";
import UserAvatar from "../UserAvatar";
import Pagination from "react-js-pagination";

function CoursesManagementList(props) {
  let [data, setData] = useState([]);
  useEffect(() => {
    getCourses(setData);
  }, [props.refresh]);
  return (
    <div class="flex flex-col">
      <div className="flex justify-end">
        <Pagination
          activePage={data.current_page}
          itemsCountPerPage={data.per_page}
          totalItemsCount={data.total}
          pageRangeDisplayed={1}
          onChange={(num) => getCourses(setData, num)}
          innerClass="flex"
          activeClass="border-none"
          itemClass="px-5 text-center font-medium text-green-400 text-xl rounded-full hover:bg-green-400 hover:text-white cursor-pointer"
          hideDisabled={true}
          hideFirstLastPages={true}
        />
      </div>
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div></div>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Teacher
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Students
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              {data.data ? (
                <tbody class="bg-white divide-y divide-gray-200">
                  {data.data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                              <UserAvatar
                                link={item.teacherAvatar}
                                name={item.teacherName}
                              />
                            </div>
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900">
                                {item.teacherName}
                              </div>
                              <div class="text-sm text-gray-500">
                                {item.teacherEmail}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">{item.title}</div>
                          <div class="text-sm text-gray-500">Optimization</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.numberOfStudents}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <DeleteCourseButton
                            id={item.courseId}
                            setRefresh={props.setRefresh}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                ""
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesManagementList;
