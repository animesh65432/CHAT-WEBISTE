import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const useGetTheCurrentUser = () => {
  const token = useSelector((state) => state.auth.idtoken);
  const dispatch = useDispatch();
  const GetCurrentUser = async () => {
    try {
      let response = await axios.get(
        `http://localhost:3000/users/GetTheCurrentUser`,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response);
      let id = response?.data?.data.id;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [GetCurrentUser];
};

export default useGetTheCurrentUser;
