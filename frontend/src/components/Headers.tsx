import React, { useEffect } from "react";
import { useGetTheCurrentUser } from "@/hooks"
import { Uselogout } from "@/components/index"
import { Link } from "react-router-dom"
import { Mobilenavbar } from "@/components"
const Headers: React.FC = () => {
  const [GetCurrentUser] = useGetTheCurrentUser()


  const fecththeuserdata = async () => {
    await GetCurrentUser()
  }

  useEffect(() => {
    fecththeuserdata()
  }, [])
  return (
    <div className="bg-black py-4 flex items-center justify-between px-4  md:h-[10vh]  w-auto ">
      <div className="md:hidden">
        <Mobilenavbar />
      </div>
      <div className="flex items-center">
        <Link to="/">
          <p className="text-white text-lg sm:text-[20px] text-[15px]">
            Welcome To The GroupChat App
          </p>
        </Link>
      </div>
      <div className="bg-slate-50 rounded-md w-[5vw] h-[vh] flex justify-center items-center"  >
        <Uselogout />
      </div>
    </div>
  );
};

export default Headers;
