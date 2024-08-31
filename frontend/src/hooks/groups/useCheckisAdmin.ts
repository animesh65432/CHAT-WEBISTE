import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Getuseradmin, isuserinthegroup } from "../../reduex/Groups";
import { baseurl } from "../../utils";
import { RootState } from "../../reduex";

const useCheckisAdmin = () => {
  const token = useSelector((state: RootState) => state.auth.idtoken);
  const groups = useSelector((state: RootState) => state.group.selectedGroups);
  const groupid = groups?.id;
  const dispatch = useDispatch();

  const fetchdata = async () => {
    try {
      console.log(typeof groupid);
      if (!groupid) {
        return;
      } else {
        const response = await axios.get(
          `${baseurl}/Groups/CheckAdminOrnot/${groupid}`,
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
      }
    } catch (error) {
      console.log(error);
      dispatch(isuserinthegroup(false));
    }
  };

  return [fetchdata];
};

export default useCheckisAdmin;
