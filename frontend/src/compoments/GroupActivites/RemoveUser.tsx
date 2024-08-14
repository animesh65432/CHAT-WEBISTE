import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useRemoveUser } from "../../hooks";
import React from "react";
interface Props {
  user: any;
}

const RemoveUser: React.FC<Props> = ({ user }: any) => {
  const isadmin = useSelector((state: any) => state.group.isuserGroupAdmin);
  const [RemoveTheUser] = useRemoveUser();

  const OnRemoveuser = async () => {
    try {
      if (!isadmin) {
        toast.error("you are not admin");
      } else {
        let res = RemoveTheUser(user?.id);
        console.log(res);
        toast.success("sucessfully remove the user");
      }
    } catch (error) {
      toast.error("try again later");
      console.log(error);
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={OnRemoveuser}
      >
        Remove
      </button>
      <ToastContainer />
    </div>
  );
};

export default RemoveUser;
