import axios from "axios";
import { useSelector } from "react-redux";
import { baseurl } from "../utils";
import { RootState } from "../reduex";

const useGetOnlyParticularOne = () => {
  const token = useSelector((state: RootState) => state.auth.idtoken);
  const fecthdata = async (id: any) => {
    try {
      let res = await axios.get(`${baseurl}/Groups/GetOnlyGroup/:${id}`, {
        headers: {
          token: token,
        },
      });
      console.log(res);
      return res?.data?.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return [fecthdata];
};

export default useGetOnlyParticularOne;
