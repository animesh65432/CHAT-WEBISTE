import axios from "axios";
import { useSelector } from "react-redux";

const useGetOnlyParticularOne = () => {
  const token = useSelector((state) => state.auth.idtoken);
  const fecthdata = async (id) => {
    try {
      let res = await axios.get(
        `http://localhost:3000/Groups/GetOnlyGroup/:${id}`,
        {
          headers: {
            token: token,
          },
        }
      );
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
