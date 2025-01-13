
import { Groups, GroupChat, Navbar } from "."
import React, { useState } from "react";
import { OptionsState } from "./Navbar"
import { ShowusersNavbar } from "@/components"

interface ChildProps {
  onSendData: (data: OptionsState) => void;
}


const Home: React.FC = () => {
  const [options, setOptions] = useState<OptionsState | null>()
  const handleData = async (data: OptionsState) => {
    setOptions(data)
    if (options?.messages) {

    }
  };

  return (
    <div className="grid  sm:grid-cols-12 grid-cols-1 ">
      <div className="col-span-1">
        <Navbar onSendData={handleData} />
      </div>
      <div className="col-span-3 ">
        {options?.group && <Groups />}
        {options?.messages && <ShowusersNavbar />}
      </div>
      <div className="col-span-8">
        <GroupChat />
      </div>
    </div>
  );
};

export default Home;
