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
    <div className=" h-dvh flex flex-col gap-0  ">
      <div>
        <GroupGroupChatMessage />
      </div>
      <div >
        <GroupGroupChatInput />
      </div>
    </div>
  );
};

export default GroupChat;
