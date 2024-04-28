import axios from "axios";
import { useSelector } from "react-redux";

const useSentMessage = () => {
  const token = useSelector((state) => state.auth.idtoken);
  const SentTheMessage = async (obj: object) => {
    try {
      let res = await axios.post(
        "http://localhost:3000/message/Postmessage",
        obj,
        {
          headers: {
            token: token,
          },
        }
      );

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
