import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { creategroupwithobject } from "../reduex/Groups";
import { baseurl } from "../utils";

const useCreateGroup = () => {
  const token = useSelector((state: any) => state.auth.idtoken);
  const dispatch = useDispatch();
  const createGroup = async (obj: object) => {
    console.log(obj);
    try {
      let result = await axios.post(`${baseurl}/Groups/createGroup`, obj, {
        headers: {
          token: token,
        },
      });
      console.log(result);
      dispatch(creategroupwithobject(obj));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [createGroup];
};

export default useCreateGroup;
