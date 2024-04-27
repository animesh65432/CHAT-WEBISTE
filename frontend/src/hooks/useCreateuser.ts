import axios from "axios";
import { useState } from "react";

const useCreateUser = () => {
  const [errors, setErrors] = useState("");

  const createUser = async (obj) => {
    try {
      let response = await axios.post(
        "http://localhost:3000/users/Singup",
        obj
      );
      console.log(response);
      return true;
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors(error.response.data.message);
      } else {
        setErrors("An unexpected error occurred.");
      }
      return false;
    }
  };

  return [createUser, errors];
};

export default useCreateUser;
