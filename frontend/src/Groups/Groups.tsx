import { useEffect } from "react";
import useGroups from "../hooks/useGroups";
import Groupitems from "./Groupitems";
import GroupBottomFrom from "./GruopsFrom/GroupBottomFrom";
import { useSelector } from "react-redux";

const Groups = () => {
  const [fecthdata] = useGroups();
  const Groups = useSelector((state) => state.group.value);
  const GetAllTheFGroups = async () => {
    try {
      let response = await fecthdata();
      setGroups(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetAllTheFGroups();
  }, []);

  if (Groups.length == 0)
    return (
      <div>
        <p>We don't have any Group Right Now</p>
        <GroupBottomFrom />
      </div>
    );
  return (
    <>
      <div>
        {Groups.map((obj, index) => (
          <Groupitems key={index} name={obj.nameofthegroup} />
        ))}
      </div>
      <GroupBottomFrom />
    </>
  );
};
export default Groups;
