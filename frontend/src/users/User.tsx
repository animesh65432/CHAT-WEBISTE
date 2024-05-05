import { useState } from "react";
import { useSelector } from "react-redux";

const User = () => {
  const users = useSelector((state) => state.user.value);
  const currentUserEmail = useSelector((state) => state.user.currentuseremail);
  const usersWithoutCurrentUser = users.filter(
    (obj) => obj.email !== currentUserEmail
  );
  const [show, setshow] = useState(false);

  if (usersWithoutCurrentUser.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        <p>No users found.</p>
      </div>
    );
  }

  return (
    <div>
      <h4>Users</h4>
      <div className="flex flex-col items-start">
        {usersWithoutCurrentUser.map((user, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-4 mb-4"
            onClick={(prev) => setshow(!prev)}
          >
            <p className="text-lg font-medium text-gray-800">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
