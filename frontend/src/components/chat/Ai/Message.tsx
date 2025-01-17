import React from "react";
import { AImessagesTypes } from "@/types/type";
import { fixthestring } from "@/utils"

type Props = {
    message: AImessagesTypes;
    inputloading: boolean
};

const Message: React.FC<Props> = ({ message, inputloading }) => {
    return (
        <div className="flex flex-col space-y-4 p-4">
            <div className="bg-blue-100 text-blue-900 rounded-lg p-3 shadow">
                <strong>User:</strong> {message.Yourmessage}
            </div>
            <div className="bg-green-100 text-green-900 rounded-lg p-3 shadow">
                <strong>AI:</strong> {fixthestring(message.message)}
            </div>

            {inputloading ? <>
                <div className="flex items-center space-x-1 ml-2">
                    <span className="h-2 w-2 bg-green-900 rounded-full animate-pulse"></span>
                    <span className="h-2 w-2 bg-green-900 rounded-full animate-pulse delay-200"></span>
                    <span className="h-2 w-2 bg-green-900 rounded-full animate-pulse delay-400"></span>
                </div></> :
                <></>
            }
        </div>
    );
};

export default Message;
