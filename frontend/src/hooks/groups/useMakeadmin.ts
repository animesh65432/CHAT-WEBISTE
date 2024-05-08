import axios from "axios";
import { useSelector } from "react-redux";

const useMakeadmin = () => {
  const token = useSelector((state) => state.auth.idtoken);
  const Groups = useSelector((state) => state.group.selectedGroups);
  let Groupid = Groups.id;
  const makeadmin = async (id) => {
    try {
      let response = await axios.post(
        "http://localhost:3000/Groups/MakeAdmin",
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
    } catch (error) {
      console.log(error);
    }
  };

  return [makeadmin];
};

export default useMakeadmin;
