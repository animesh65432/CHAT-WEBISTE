import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useMakeadmin } from "../../hooks";
import React from "react";
import { RootState } from "../../reduex";
import { Button } from "@/components/ui/button"

interface Props {
  user: { id: number; email: string };
}

const MakeAdmin: React.FC<Props> = ({ user }) => {
  const isadmin = useSelector(
    (state: RootState) => state.group.isuserGroupAdmin
  );
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
      <Button onClick={OnClickMakeadmin}>Make Admin</Button>
      <ToastContainer />
    </div>
  );
};

export default MakeAdmin;
