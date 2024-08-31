import { useState } from "react";
import GroupForm from "./GroupFrom";
import React from "react";

const GroupBottomFrom: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const onChangeTheBottom = () => {
    setShow((prev) => !prev);
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onChangeTheBottom}
      >
        Create
      </button>
      {show && <GroupForm />}
    </div>
  );
};

export default GroupBottomFrom;
