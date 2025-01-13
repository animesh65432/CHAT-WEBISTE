import React from 'react'
import { usersTypes } from "@/types/type"
import { CiUser } from "react-icons/ci";


type Props = {
    user: usersTypes
}

const User: React.FC<Props> = ({ user }) => {
    return (
        <div className='border border-gray-200 rounded-md shadow-md p-4 mb-4 flex items-center gap-5'>
            <div>
                <CiUser className='w-12' />
            </div>
            <div className='text-lg font-medium text-gray-800'>{user.name}</div>
        </div>
    )
}

export default User