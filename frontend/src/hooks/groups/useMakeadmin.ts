import axios from "axios";
import { useSelector } from "react-redux";
import { baseurl } from "../../utils";
import { RootState } from "../../reduex";
const useMakeadmin = () => {
  const token = useSelector((state: RootState) => state.auth.idtoken);
  const Groups = useSelector((state: RootState) => state.group.selectedGroups);

  let Groupid = Groups?.id;
  const makeadmin = async (id: any) => {
    try {
      let response = await axios.post(
        `${baseurl}/Groups/MakeAdmin`,
        {
          UserId: id,
          GroupId: Groupid,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [makeadmin];
};

export default useMakeadmin;
