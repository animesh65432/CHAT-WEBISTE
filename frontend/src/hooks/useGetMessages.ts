import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Getthemessages } from "../reduex/Messages";
import { baseurl } from "../utils";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.idtoken);
  const GetTheMessagesfunc = async () => {
    try {
      let Messagse = await axios.get(`${baseurl}/message/GettheMessages`, {
        headers: {
          token: token,
        },
      });
      let res = Messagse?.data?.data;
      console.log(res);
      dispatch(Getthemessages(res));
      updateLocalStorage(res);
    } catch (error) {
      console.log(error);
    }
  };

  return [GetTheMessagesfunc];
};

interface Message {
  id: string;
  text: string;
}

const updateLocalStorage = (newMessages: Message[]): void => {
  let storedMessages: Message[] = JSON.parse(
    localStorage.getItem("messages") || "[]"
  );

  storedMessages.push(...newMessages);

  if (storedMessages.length > 10) {
    storedMessages = storedMessages.slice(-10);
  }

  localStorage.setItem("messages", JSON.stringify(storedMessages));
};

export default useGetMessages;
