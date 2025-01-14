import { Error, GroupGroupChatMessage, GroupGroupChatInput } from "../index";
import { useSelector } from "react-redux";
import { RootState } from "@/reduex";
import React from "react";

const GroupChat: React.FC = () => {
  let isuser = useSelector((state: RootState) => state.group.isuser);
  let userselectedGrops = useSelector(
    (state: RootState) => state.group.selectedGroups
  );
  if (userselectedGrops) {
    if (!isuser) {
      return <Error />;
    }
  }

  return (
    <div className=" h-full flex flex-col  ">
      <div className="h-[590px] ">
        <GroupGroupChatMessage />
      </div>
      <div >
        <GroupGroupChatInput />
      </div>
    </div>
  );
};

export default GroupChat;
