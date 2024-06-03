import axios from "axios";
import { useSelector } from "react-redux";
import { baseurl } from "../utils";
const useSentMessage = () => {
  const token = useSelector((state: any) => state.auth.idtoken);

  const SentTheMessage = async (obj: object) => {
    console.log(obj);
    try {
      let res = await axios.post(`${baseurl}/message/sendMessages`, obj, {
        headers: {
          token: token,
        },
      });

      console.log(res);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [SentTheMessage];
};

export default useSentMessage;
