import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useRemoveUser } from "../../hooks";
import { RootState } from "../../reduex";
import React from "react";
import { Button } from "@/components/ui/button"
interface Props {
  user: { id: number; email: string };
}

const RemoveUser: React.FC<Props> = ({ user }: any) => {
  const isadmin = useSelector(
    (state: RootState) => state.group.isuserGroupAdmin
  );
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

      <Button onClick={OnRemoveuser}>
        Remove
      </Button>
      <ToastContainer />
    </div>
  );
};

export default RemoveUser;
