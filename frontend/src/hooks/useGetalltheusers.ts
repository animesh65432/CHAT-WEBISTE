import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getalltheusers } from "../reduex/users";

const useGetalltheusers = () => {
  const token = useSelector((state) => state.auth.idtoken);
  const dispatch = useDispatch();
  const fetchtheusers = async () => {
    try {
      let response = await axios.get(
        "http://localhost:3000/users/AllTheusers",
        {
          headers: {
            token: token,
          },
        }
      );

      let data = response?.data?.data;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return [fetchtheusers];
};

export default useGetalltheusers;
