import axios from "axios";
import { useState } from "react";

const useloginhook = () => {
  const [errors, seterrors] = useState("");
  const loginuser = async (obj) => {
    console.log(obj);
    try {
      let res = await axios.post(`http://localhost:3000/users/login`, obj);
      console.log(res);
      return true;
    } catch (error) {
      console.log(error.response.data.message);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        seterrors(error.response.data.message);
      } else {
        seterrors("An unexpected error occurred.");
      }
      return false;
    }
  };

  return [loginuser, errors];
};

export default useloginhook;
