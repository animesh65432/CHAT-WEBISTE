import React, { useEffect, useState } from "react";
import GroupActivities from "../GroupActivites/Groupactivites";
import { useGetalltheusers } from "../../hooks";
import { Button } from "@/components/ui/button"
interface User {
  id: number;
  name: string;
  email: string;
}

const User: React.FC = () => {
  const [usersArray, setUsersArray] = useState<User[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [fetchtheusers] = useGetalltheusers();
  const [showGroupActivities, setShowGroupActivities] =
    useState<boolean>(false);

  const onChangeTheUsersName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);

    if (input.length > 0) {
      const suggestedUsers = usersArray.filter(
        (user) => user.name.includes(input)
      );
      setUsersArray(suggestedUsers);
    } else {
      setUsersArray(usersArray);
    }
  };

  const afterRenderingComponent = async () => {
    try {
      const data: User[] = await fetchtheusers();
      setUsersArray(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    afterRenderingComponent();
  }, []);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-8 rounded-lg w-96">
      <label
        htmlFor="username"
        className="block text-sm font-medium text-gray-700"
      >
        Username:
      </label>
      <input
        type="text"
        id="username"
        className="mt-1 block w-full border-2 border-gray-300 bg-white rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Search user name here"
        value={userInput}
        onChange={onChangeTheUsersName}
      />
      <h4 className="text-lg font-semibold mb-4 mt-6">Users</h4>
      <div className="space-y-4">
        {usersArray.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            <p>No users found.</p>
          </div>
        ) : (
          usersArray.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow rounded-lg p-4 cursor-pointer hover:bg-gray-50 overflow-auto"
            >
              <p className="text-gray-800 font-medium">{user.name}</p>
              <Button onClick={() => setShowGroupActivities((prev) => !prev)}>Edit</Button>
              {showGroupActivities && <GroupActivities user={user} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default User;
