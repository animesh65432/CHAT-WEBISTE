import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createnewmessages } from "../reduex/Messages";

const useSentMessage = () => {
  const token = useSelector((state) => state.auth.idtoken);
  const dispatch = useDispatch();
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
      dispatch(
        createnewmessages([
          {
            id: Date.now(),
            ...obj,
          },
        ])
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [SentTheMessage];
};

export default useSentMessage;
