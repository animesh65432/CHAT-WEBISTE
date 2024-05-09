import axios from "axios";
import { useSelector } from "react-redux";

const useRemoveUser = () => {
  const Group = useSelector((state) => state.group.selectedGroups);
  const token = useSelector((state) => state.auth.idtoken);
  const GroupId = Group.id;

  const RemoveTheUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/Groups/removeuser`,
        {
          headers: {
            token: token,
          },
          data: {
            GroupId: GroupId,
            UserId: id,
          },
        }
      );
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
