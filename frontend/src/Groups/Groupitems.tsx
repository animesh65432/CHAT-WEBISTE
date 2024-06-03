import { useDispatch } from "react-redux";
import { onselectthegroup } from "../reduex/Groups";
import React from "react";
interface Props {
  obj: any;
}
const Groupitems: React.FC<Props> = ({ obj }) => {
  const dispatch = useDispatch();

  const SelectedTheGroup = (obj: any) => {
    dispatch(onselectthegroup(obj));
  };
  return (
    <div
      className="border border-gray-200 rounded-md shadow-md p-4 mb-4"
      onClick={() => SelectedTheGroup(obj)}
    >
      <div className="text-lg font-medium text-gray-800">
        {obj.nameofthegroup.toUpperCase()}
      </div>
    </div>
  );
};

export default Groupitems;
