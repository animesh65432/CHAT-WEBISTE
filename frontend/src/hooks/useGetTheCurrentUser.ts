import axios from "axios";
import { useSelector } from "react-redux";
import { baseurl } from "../utils";
const useGetTheCurrentUser = () => {
  const token = useSelector((state: any) => state.auth.idtoken);
  const GetCurrentUser = async () => {
    try {
      let response = await axios.get(`${baseurl}/users/GetTheCurrentUser`, {
        headers: {
          token: token,
        },
      });
      console.log(response);
      let id = response?.data?.data.id;
      console.log(id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [GetCurrentUser];
};

export default useGetTheCurrentUser;
