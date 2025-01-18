import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const UserChatinput: React.FC = () => {
    const [message, setmessage] = useState<string>("")


    return (
        <div className='flex flex-row'>
            <div className='w-[62vw]'><Input onChange={(e) => setmessage(e.target.value)} value={message} /></div>
            <div><Button className='w-[5vw] bg-blue-600 hover:bg-blue-800 rounded-none'>SEND</Button></div>
        </div>
    )
}

export default UserChatinput