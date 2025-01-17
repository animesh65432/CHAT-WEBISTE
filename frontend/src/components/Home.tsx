
import { Groups, GroupChat, Navbar } from "."
import React, { useState } from "react";
import { OptionsState } from "./Navbar"
import { ShowusersNavbar } from "@/components"
import { Aichat } from "@/components/chat"

interface ChildProps {
  onSendData: (data: OptionsState) => void;
}


const Home: React.FC = () => {
  const [options, setOptions] = useState<OptionsState>()
  const handleData = async (data: OptionsState) => {
    setOptions(data)
    if (options?.messages) {

    }
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
      </div>
    </div>
  );
};

export default Home;
