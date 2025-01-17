import React, { useEffect, useState } from 'react'
import { useSentmessageai } from "@/hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToastContainer, toast } from "react-toastify"

type Props = {
    GetTheinputloading: (loading: boolean) => void
}

const AichatInput: React.FC<Props> = ({ GetTheinputloading }) => {
    const [loading, senthemesagestoai] = useSentmessageai()
    const [message, setmessage] = useState<string>("")


    const submitthetext = async () => {
        if (message.length === 0) {
            toast.error(`Message is  Empty`)
        }
        try {
            senthemesagestoai({ message })
            setmessage("")
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetTheinputloading(loading)
    }, [loading])
    return (
        <>
            <div className='flex flex-row gap-2'>
                <div>
                    <Input onChange={(e) => setmessage(e.target.value)} className='border-2 border-blue-400 rounded-none w-[85vw]' value={message} />
                </div>
                <div>
                    <Button onClick={submitthetext} className='rounded-none bg-blue-600'>
                        {loading ? "loading" : "send"}
                    </Button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default AichatInput