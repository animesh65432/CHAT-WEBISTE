import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { CiMenuBurger } from "react-icons/ci";
import { FaMessage } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { LuBrainCircuit } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux"
import { handleToggle } from "@/reduex/options"
import { RootState } from "@/reduex"

const Mobilenavbar: React.FC = () => {
    const dispacth = useDispatch()
    const options = useSelector((state: RootState) => state.option)

    const handle = (key: "messages" | "group" | "ai") => {
        dispacth(handleToggle(key))
    }

    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <CiMenuBurger className='text-white font-bold text-[25px]' />
                </SheetTrigger>
                <SheetContent className='flex flex-col items-center justify-start gap-24'>
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
                </SheetContent>
            </Sheet>
        </>
    )
}

export default Mobilenavbar