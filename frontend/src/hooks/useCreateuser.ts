import axios from "axios";
import { useState } from "react";
import { baseurl } from "../utils";

interface UserInput {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
}

type UseCreateUserHook = [(obj: UserInput) => Promise<boolean>, string];

const useCreateUser = (): UseCreateUserHook => {
  const [errors, setErrors] = useState<string>("");

  const createUser = async (obj: UserInput): Promise<boolean> => {
    try {
      const response = await axios.post(`${baseurl}/users/Singup`, obj);
      console.log(response);
      return true;
    } catch (error: any) {
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
