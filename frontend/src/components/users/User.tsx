import React from 'react'
import { usersTypes } from "@/types/type"
import { CiUser } from "react-icons/ci";
import { useDispatch } from "react-redux"
import { changeuser } from "@/reduex/usermessages"
import { useSelector } from "react-redux"
import { RootState } from "@/reduex/index"

type Props = {
    user: usersTypes
}

const User: React.FC<Props> = ({ user }) => {
    const dispacth = useDispatch()
    const selecteduser = useSelector((state: RootState) => state.userMessages.SelectedUser)
    const handletheuser = () => {
        dispacth(changeuser(user))
    }
    return (
        <div className={` flex gap-4 justify-center h-[6vh] items-center ${user.id === selecteduser?.id ? "bg-blue-400" : ""}`} onClick={handletheuser}>
            <div>
                {user.image ? <img src={user.image} className='w-12' /> : <CiUser className='w-12' />}
            </div>
            <div className='text-lg font-medium text-gray-800'>{user.name}</div>
        </div>
    )
}

export default User