import React, { useEffect } from "react";
import { useGetallaimessages } from "@/hooks";
import { useSelector } from "react-redux"
import { RootState } from "@/reduex"
import { Message } from "./index"
import ClipLoader from "react-spinners/ClipLoader";


type Props = {
    inputloading: boolean
}

const Aichatmessages: React.FC<Props> = ({ inputloading }) => {
    const [loading, getAiMessages] = useGetallaimessages();
    const Aimessags = useSelector((state: RootState) => state.Ai.messages)

    const fetchAllPrevAiMessages = async () => {
        try {
            await getAiMessages();
        } catch (error) {
            console.error("Error fetching AI messages:", error);
        }
    };

    useEffect(() => {
        fetchAllPrevAiMessages()
    }, []);

    if (loading) {

        return <div className="flex items-center justify-center h-dvh">
            <ClipLoader
                color="#3396e8"
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>

    }

    return (
        <div>
            {
                Aimessags.length > 0 ? <div>
                    {
                        Aimessags.map((message) => <Message key={message.id} message={message} inputloading={inputloading} />)
                    }
                </div> : <div className="bg-green-100 text-green-900 rounded-lg p-3 shadow">
                    <strong>AI:</strong>How can i Help you
                </div>
            }
        </div>
    );
};

export default Aichatmessages;
