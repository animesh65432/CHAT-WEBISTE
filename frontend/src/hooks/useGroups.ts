import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addtheGrouops } from "../reduex/Groups";

const useGroups = () => {
  let token = useSelector((state) => state.auth.idtoken);
  const dispatch = useDispatch();
  const fecthdata = async () => {
    try {
      let response = await axios.get(
        "http://localhost:3000/Groups/Groupusers",
        {
          headers: {
            token: token,
          },
        }
      );

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
