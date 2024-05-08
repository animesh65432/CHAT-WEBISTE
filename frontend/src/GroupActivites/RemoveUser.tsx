import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import useRemoveUser from "../hooks/groups/useReomveuser";

const RemoveUser = ({ user }) => {
  const isadmin = useSelector((state) => state.group.isuserGroupAdmin);
  const [RemoveTheUser] = useRemoveUser();

  const OnRemoveuser = () => {
    if (!isadmin) {
      toast.error("you are not admin");
    } else {
      RemoveTheUser(user?.id);
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
    </div>
  );
};

export default RemoveUser;
