import React from 'react'
import { useSelector } from "react-redux"
import User from './User'
import { RootState } from "@/reduex"

const ShowusersNavbar: React.FC = () => {
    const Users = useSelector((state: RootState) => state.user.value)
    return (
        <div className='flex flex-col h-full'>
            <div className='text-2xl font-bold mb-4 text-center'>
                Friends
            </div>
            {
                Users.length === 0 ? (
                    <div className='font-mono'>
                        You don't have any friends
                    </div>
                ) : (
                    <div className='font-mono bg-blue-200 flex md:flex-col md:flex-grow md:overflow-y-scroll overflow-x-scroll'>
                        {Users.map((user) => <User user={user} key={user.id} />)}
                    </div>
                )
            }
        </div>
    )
}

export default ShowusersNavbar
