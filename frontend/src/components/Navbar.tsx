import React, { useEffect } from "react";
import { FaMessage } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { LuBrainCircuit } from "react-icons/lu";
import { useGetalltheusers } from "@/hooks"
import { useDispatch } from "react-redux"
import { getalltheusers } from "@/reduex/users"
import { handleToggle } from "@/reduex/options"
import { useSelector } from "react-redux"
import { RootState } from "@/reduex/index"

const Navbar: React.FC = () => {
    const options = useSelector((state: RootState) => state.option)
    const [fetchtheusers] = useGetalltheusers()
    const dispacth = useDispatch()

    const fetchusers = async () => {
        try {
            console.log("just call users api")
            const users = await fetchtheusers()
            console.log(users)
            dispacth(getalltheusers(users))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchusers()
    }, [options])

    const handle = (key: "messages" | "group" | "ai") => {
        dispacth(handleToggle(key))
    }

    return (
        <div className="flex md:flex-col flex-row items-center  md:gap-10  md:justify-normal justify-evenly  md:w-3/4 bg-slate-200 h-[90vh]">
            <div
                className="mt-4 cursor-pointer"
                onClick={() => handle("messages")}
            >
                <FaMessage
                    className={`w-6 h-6 ${options.messages ? "text-slate-900" : "text-slate-700 "
                        }`}
                />
            </div>
            <div className="cursor-pointer" onClick={() => handle("group")}>
                <FaUserGroup
                    className={`w-6 h-6 ${options.group ? "text-slate-900" : "text-slate-700 "
                        }`}
                />
            </div>
            <div className="cursor-pointer" onClick={() => handle("ai")}>
                <LuBrainCircuit
                    className={`w-6 h-6 ${options.ai ? "text-slate-900" : "text-slate-700 "
                        }`}
                />
            </div>
        </div>
    );
};

export default Navbar;
