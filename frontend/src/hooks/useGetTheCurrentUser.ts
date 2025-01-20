import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { baseurl } from "../utils";
import { RootState } from "../reduex";
import { setthecurrentuser } from "@/reduex/users"
const useGetTheCurrentUser = () => {
  const token = useSelector((state: RootState) => state.auth.idtoken);
  const dispacth = useDispatch()
  const GetCurrentUser = async () => {
    try {
      let response = await axios.get(`${baseurl}/users/GetTheCurrentUser`, {
        headers: {
          token: token,
        },
      });
      const currentuser = response?.data?.data
      dispacth(setthecurrentuser(currentuser))
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [GetCurrentUser];
};

export default useGetTheCurrentUser;
