import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addthetoken } from "../reduex/Auth";
import { baseurl } from "../utils";

interface LoginInput {
  email: string;
  password: string;
}

type UseLoginHook = [(obj: LoginInput) => Promise<boolean>, string];

const useloginhook = (): UseLoginHook => {
  const [errors, seterrors] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginuser = async (obj: LoginInput): Promise<boolean> => {
    try {
      const res = await axios.post(`${baseurl}/users/login`, obj);
      const token = res?.data?.token;
      dispatch(addthetoken(token));
      navigate("/");
      return true;
    } catch (error: any) {
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
