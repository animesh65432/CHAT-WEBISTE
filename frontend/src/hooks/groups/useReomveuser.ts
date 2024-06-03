import axios from "axios";
import { useSelector } from "react-redux";
import { baseurl } from "../../utils";

const useRemoveUser = () => {
  const Group = useSelector((state: any) => state.group.selectedGroups);
  const token = useSelector((state: any) => state.auth.idtoken);
  const GroupId = Group.id;

  const RemoveTheUser = async (id: any) => {
    try {
      const response = await axios.delete(`${baseurl}/Groups/removeuser`, {
        headers: {
          token: token,
        },
        data: {
          GroupId: GroupId,
          UserId: id,
        },
      });
      console.log(response.data);

      return true;
    } catch (error) {
      console.error("Error removing user:", error);

      return false;
    }
  };

  return [RemoveTheUser];
};

export default useRemoveUser;
