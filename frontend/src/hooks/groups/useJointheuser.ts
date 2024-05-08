import axios from "axios";
import { useSelector } from "react-redux";

const useJointheuser = () => {
  const Group = useSelector((state) => state.group.selectedGroups);
  const token = useSelector((state) => state.auth.idtoken);
  const GroupId = Group.id;
  const joinTheGroup = async (id) => {
    try {
      let response = await axios.post(
        `http://localhost:3000/Groups/JoinGroupthroungadmin`,
        {
          GroupId: GroupId,
          UserId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return [joinTheGroup];
};

export default useJointheuser;
