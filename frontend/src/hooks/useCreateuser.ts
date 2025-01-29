import axios from "axios";
import { useState } from "react";
import { baseurl } from "../utils";
import { findSourceMap } from "module";

interface UserInput {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
}

type UseCreateUserHook = [(obj: UserInput) => Promise<boolean>, string, loading: boolean];

const useCreateUser = (): UseCreateUserHook => {
  const [loading, setloading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string>("");

  const createUser = async (obj: UserInput): Promise<boolean> => {
    setloading(true)
    try {
      await axios.post(`${baseurl}/users/Singup`, obj);

      return true;
    } catch (error: any) {
      console.log(error)
      setErrors(error.response.data.message);
      return false;
    }
    finally {
      setloading(false)
    }
  };

  return [createUser, errors, loading];
};

export default useCreateUser;
