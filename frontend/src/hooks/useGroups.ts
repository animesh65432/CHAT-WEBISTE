import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addtheGrouops } from "../reduex/Groups";
import { baseurl } from "../utils";

const useGroups = () => {
  let token = useSelector((state: any) => state.auth.idtoken);
  const dispatch = useDispatch();
  const fecthdata = async () => {
    try {
      let response = await axios.get(`${baseurl}/Groups/Groupusers`, {
        headers: {
          token: token,
        },
      });

      dispatch(addtheGrouops(response?.data?.data));
      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return [fecthdata];
};

export default useGroups;
