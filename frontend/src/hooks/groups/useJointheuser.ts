import axios from "axios";
import { useSelector } from "react-redux";
import { baseurl } from "../../utils";

const useJointheuser = () => {
  const Group = useSelector((state: any) => state.group.selectedGroups);
  const token = useSelector((state: any) => state.auth.idtoken);
  const GroupId = Group.id;
  const joinTheGroup = async (id: any) => {
    try {
      let response = await axios.post(
        `${baseurl}/Groups/JoinGroupthroungadmin`,
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
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [joinTheGroup];
};

export default useJointheuser;
