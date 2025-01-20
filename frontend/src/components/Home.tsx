import { Groups, GroupChat, Navbar } from "."
import React, { useState } from "react";
import { OptionsState } from "./Navbar"
import { ShowusersNavbar } from "@/components"
import { Aichat, Userchat } from "@/components/chat"


const Home: React.FC = () => {
  const [options, setOptions] = useState<OptionsState>()
  const handleData = async (data: OptionsState) => {
    setOptions(data)

  };

  return (
    <div className="grid  sm:grid-cols-12  ">
      <div className="col-span-1">
        <Navbar onSendData={handleData} />
      </div>
      <div className={options?.ai ? "hidden" : "col-span-3"}>
        {options?.group && <Groups />}
        {options?.messages && <ShowusersNavbar />}
      </div>
      <div className={options?.ai ? `col-span-11` : "col-span-8"}>
        {options?.group && <GroupChat />}
        {options?.ai && <Aichat />}
        {options?.messages && <Userchat />}
      </div>
    </div>
  );
};

export default Home;
