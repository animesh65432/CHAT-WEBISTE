import axios from "axios";
const useCreateuser = () => {
  const createthesuer = async (obj: object) => {
    try {
      let Response = await axios.post(
        "http://localhost:3000/users/Singup",
        obj
      );
      console.log(Response);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [createthesuer];
};

export default useCreateuser;
