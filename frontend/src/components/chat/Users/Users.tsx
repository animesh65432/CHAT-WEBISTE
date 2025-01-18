import React from 'react'
import { UserChatMessage, UserChatinput } from "./index"

const UserGroupChat: React.FC = () => {
    return (
        <div className='flex flex-col'>
            <UserChatMessage />
            <UserChatinput />
        </div>
    )
}

export default UserGroupChat