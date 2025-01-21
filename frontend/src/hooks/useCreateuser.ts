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
      await axios.post(`${baseurl}/users/Singup`, obj);

      return true;
    } catch (error: any) {
      console.log(error)
      setErrors(error.response.data.message);
      return false;
    }
  };

  return [createUser, errors];
};

export default useCreateUser;
