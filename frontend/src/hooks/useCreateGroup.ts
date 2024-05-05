import axios from "axios";
import { useSelector } from "react-redux";

const useCreateGroup = () => {
  const token = useSelector((state) => state.auth.idtoken);
  const createGroup = async (obj: object) => {
    console.log(obj);
    try {
      let result = await axios.post(
        "http://localhost:3000/Groups/createGroup",
        obj,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(result);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [createGroup];
};

export default useCreateGroup;
