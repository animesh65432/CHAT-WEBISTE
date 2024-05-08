import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useMakeadmin from "../hooks/groups/useMakeadmin";

const MakeAdmin = ({ user }) => {
  const isadmin = useSelector((state) => state.group.isuserGroupAdmin);
  const [makeadmin] = useMakeadmin();
  const OnClickMakeadmin = () => {
    if (!isadmin) {
      toast.error("you are not admin");
    } else {
      makeadmin(user?.id);
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={OnClickMakeadmin}
      >
        Make Admin
      </button>
    </div>
  );
};

export default MakeAdmin;
