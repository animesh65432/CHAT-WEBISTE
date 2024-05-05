import { useState } from "react";
import GroupForm from "./GroupFrom";

const GroupBottomFrom = () => {
  const [show, setshow] = useState(false);

  const Onchangethebottom = () => {
    setshow((prev) => !prev);
  };
  return (
    <div>
      <button onClick={Onchangethebottom}>Create</button>
      {show && <GroupForm />}
    </div>
  );
};

export default GroupBottomFrom;
