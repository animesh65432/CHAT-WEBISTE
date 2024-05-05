import axios from "axios";
import { useState } from "react";
import { addthetoken } from "../reduex/Auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTheCurrentuseremail } from "../reduex/users";

const useloginhook = () => {
  const [errors, seterrors] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginuser = async (obj) => {
    const { email } = obj;
    try {
      let res = await axios.post(`http://localhost:3000/users/login`, obj);
      let token = res?.data?.token;
      dispatch(addthetoken(token));
      dispatch(getTheCurrentuseremail(email));
      navigate("/");
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
