import React, { useState, useEffect } from "react";
import { getStudents, getTeachers } from "../../api/API_User";
import EditUserButton from "../buttons/EditUserButton";
import UserStatusSwitch from "../switch/UserStatusSwitch";
import UserAvatar from "../UserAvatar";
function UserList(props) {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    if (props.for == "student") {
      getStudents(setUsers);
      props.setRefresh(false);
    } else {
      getTeachers(setUsers);
      props.setRefresh(false);
    }
  }, [props.refresh]);
  return (
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
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
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {users.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-10 w-10">
                            <UserAvatar link={item.avatar} name={item.name} />
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div class="text-sm text-gray-500">
                              {item.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                          Regional Paradigm Technician
                        </div>
                        <div class="text-sm text-gray-500">Optimization</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <UserStatusSwitch status={item.status} id={item.id} />
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.role == 0
                          ? "Student"
                          : item.role == 1
                          ? "Teacher"
                          : "Admin"}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <EditUserButton
                          data={item}
                          setRefresh={props.setRefresh}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
