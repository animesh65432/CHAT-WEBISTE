import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Getuseradmin, isuserinthegroup } from "../../reduex/Groups";

const useCheckisAdmin = () => {
  const token = useSelector((state) => state.auth.idtoken);
  const groups = useSelector((state) => state.group.selectedGroups);
  const groupid = groups?.id || "";
  const dispatch = useDispatch();

  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/Groups/CheckAdminOrnot/${groupid}`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response);
      console.log(response?.data?.data?.isAdmin);
      dispatch(Getuseradmin(response?.data?.data?.isAdmin));
      dispatch(isuserinthegroup(true));
    } catch (error) {
      console.log(error);
      dispatch(isuserinthegroup(false));
    }
  };

  return [fetchdata];
};

export default useCheckisAdmin;
