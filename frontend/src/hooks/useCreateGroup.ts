import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addtheGrouops } from "../reduex/Groups";
import { baseurl } from "../utils";
import { RootState } from "../reduex";

const useCreateGroup = () => {
  const token = useSelector((state: RootState) => state.auth.idtoken);
  const dispatch = useDispatch();
  const createGroup = async (obj: object) => {
    console.log(obj);
    try {
      await axios.post(`${baseurl}/Groups/createGroup`, obj, {
        headers: {
          token: token,
        },
      });
      let response = await axios.get(`${baseurl}/Groups/Groupusers`);
      dispatch(addtheGrouops(response?.data?.data));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [createGroup];
};

export default useCreateGroup;
