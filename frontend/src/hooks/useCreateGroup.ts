import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addtheGrouops } from "../reduex/Groups";
import { baseurl } from "../utils";
import { RootState } from "../reduex";
import { useState } from "react";
type UseCreateGroupReturnTypes = [(obj: object) => Promise<boolean>, string];
const useCreateGroup = (): UseCreateGroupReturnTypes => {
  const token = useSelector((state: RootState) => state.auth.idtoken);
  const [errormessage, seterrormessage] = useState<string>("");
  const dispatch = useDispatch();
  const createGroup = async (obj: object) => {
    try {
      await axios.post(`${baseurl}/Groups/createGroup`, obj, {
        headers: {
          token: token,
        },
      });
      let response = await axios.get(`${baseurl}/Groups/Groupusers`, {
        headers: {
          token,
        },
      });
      console.log(response?.data);
      dispatch(addtheGrouops(response?.data?.data));
      return true;
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      seterrormessage(error?.response?.data?.message);
      return false;
    }
  };

  return [createGroup, errormessage];
};

export default useCreateGroup;
