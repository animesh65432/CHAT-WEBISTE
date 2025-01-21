import React, { useEffect, useState } from "react";
import { FaMessage } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { LuBrainCircuit } from "react-icons/lu";
import { useGetalltheusers } from "@/hooks"
import { useDispatch } from "react-redux"
import { getalltheusers } from "@/reduex/users"

export interface OptionsState {
    messages: boolean;
    group: boolean;
    ai: boolean;
}

type Props = {
    onSendData: (data: OptionsState) => void;
}

const Navbar: React.FC<Props> = ({ onSendData }) => {
    const [options, setOptions] = useState<OptionsState>({
        messages: false,
        group: false,
        ai: false,
    });
    const [fetchtheusers] = useGetalltheusers()
    const dispacth = useDispatch()

    const handleToggle = (key: keyof OptionsState) => {
        const newOptions: OptionsState =
            key === "ai"
                ? { messages: false, group: false, ai: true }
                : key === "group"
                    ? { messages: false, group: true, ai: false }
                    : { messages: true, group: false, ai: false };

        setOptions(newOptions);
        onSendData(newOptions);
    };

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
    }, [options.messages])

    console.log(options.ai, options.group, options.messages, "from navbar components")
    return (
        <div className="flex md:flex-col flex-row items-center md:h-dvh md:gap-10  md:justify-normal justify-evenly bg-slate-200  h-[10vh]  md:w-3/4">
            <div
                className="mt-4 cursor-pointer"
                onClick={() => handleToggle("messages")}
            >
                <FaMessage
                    className={`w-6 h-6 ${options.messages ? "text-blue-600" : "text-blue-400 "
                        }`}
                />
            </div>
            <div className="cursor-pointer" onClick={() => handleToggle("group")}>
                <FaUserGroup
                    className={`w-6 h-6 ${options.group ? "text-blue-600 " : "text-blue-400"
                        }`}
                />
            </div>
            <div className="cursor-pointer" onClick={() => handleToggle("ai")}>
                <LuBrainCircuit
                    className={`w-6 h-6 ${options.ai ? "text-blue-600" : "text-blue-400"
                        }`}
                />
            </div>
        </div>
    );
};

export default Navbar;
