import { Groups, GroupChat, Navbar } from "."
import React from "react";
import { ShowusersNavbar } from "@/components"
import { Aichat, Userchat } from "@/components/chat"
import { useSelector } from "react-redux";
import { RootState } from "@/reduex/index"


const Home: React.FC = () => {
  const options = useSelector((state: RootState) => state.option)

  console.log(options)

  return (
    <div className="grid  grid-cols-12   h-[90vh]  ">
      <div className="md:col-span-1 md:block hidden">
        <Navbar />
      </div>
      <div className={`${options?.ai ? "hidden" : "md:col-span-3 col-span-4"} `}>
        {options?.group && <Groups />}
        {options?.messages && <ShowusersNavbar />}
      </div>
      <div
        className={
          options?.ai
            ? "md:col-span-11 col-span-12"
            : "md:col-span-8 col-span-8"
        }
      >

        {options?.group && <GroupChat />}
        {options?.ai && <Aichat />}
        {options?.messages && <Userchat />}
      </div>
    </div>
  );
};

export default Home;
