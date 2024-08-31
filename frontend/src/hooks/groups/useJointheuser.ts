import axios from "axios";
import { useSelector } from "react-redux";
import { baseurl } from "../../utils";
import { RootState } from "../../reduex";

const useJointheuser = () => {
  const Group = useSelector((state: RootState) => state.group.selectedGroups);
  const token = useSelector((state: RootState) => state.auth.idtoken);
  const GroupId = Group?.id;
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
