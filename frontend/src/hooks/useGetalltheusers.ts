import axios from "axios";
import { useSelector } from "react-redux";
import { baseurl } from "../utils";

const useGetalltheusers = () => {
  const token = useSelector((state: any) => state.auth.idtoken);
  const fetchtheusers = async () => {
    try {
      let response = await axios.get(`${baseurl}/users/AllTheusers`, {
        headers: {
          token: token,
        },
      });

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
