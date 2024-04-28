import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Getthemessages } from "../reduex/Messages";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.idtoken);
  const GetTheMessagesfunc = async () => {
    try {
      let Messagse = await axios.get(
        "http://localhost:3000/message/GettheMessages",
        {
          headers: {
            token: token,
          },
        }
      );
      let res = Messagse?.data?.data;
      console.log(res);
      dispatch(Getthemessages(res));
    } catch (error) {
      console.log(error);
    }
  };

  return [GetTheMessagesfunc];
};

export default useGetMessages;
