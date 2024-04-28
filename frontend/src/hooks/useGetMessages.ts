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
      updateLocalStorage(res);
    } catch (error) {
      console.log(error);
    }
  };

  return [GetTheMessagesfunc];
};

const updateLocalStorage = (newMessages) => {
  let storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
  storedMessages.push(...newMessages);

  if (storedMessages.length > 10) {
    storedMessages = storedMessages.slice(-10);
  }

  localStorage.setItem("messages", JSON.stringify(storedMessages));
};

export default useGetMessages;
