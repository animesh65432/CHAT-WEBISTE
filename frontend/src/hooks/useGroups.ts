import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useGroups = () => {
  let token = useSelector((state) => state.auth.idtoken);
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

      console.log(response);

      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return [fecthdata];
};

export default useGroups;
