import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import useJointheuser from "../hooks/groups/useJointheuser";

const Joinusers = ({ user }) => {
  const isadmin = useSelector((state) => state.group.isuserGroupAdmin);
  const [joinTheGroup] = useJointheuser();
  const OnclickJoinTheuser = () => {
    if (!isadmin) {
      toast.error("You Are not admin");
    } else {
      joinTheGroup(user.id);
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={OnclickJoinTheuser}
      >
        Join
      </button>
    </div>
  );
};

export default Joinusers;
