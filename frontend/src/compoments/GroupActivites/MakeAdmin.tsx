import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useMakeadmin } from "../../hooks";
import React from "react";

interface Props {
  user: any;
}

const MakeAdmin: React.FC<Props> = ({ user }) => {
  const isadmin = useSelector((state: any) => state.group.isuserGroupAdmin);
  const [makeadmin] = useMakeadmin();
  const OnClickMakeadmin = async () => {
    try {
      if (!isadmin) {
        toast.error("you are not admin");
      } else {
        let res = makeadmin(user?.id);
        console.log(res);
        toast.success("Sucessfully make the admin");
      }
    } catch (error) {
      toast.error("try again");
      console.log(error);
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
      <ToastContainer />
    </div>
  );
};

export default MakeAdmin;
