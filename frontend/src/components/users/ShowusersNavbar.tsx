import React from 'react'
import { useSelector } from "react-redux"
import User from './User'
import { RootState } from "@/reduex"

const ShowusersNavbar: React.FC = () => {
    const Users = useSelector((state: RootState) => state.user.value)
    return (
        <div >
            <div className='text-2xl font-bold mb-4 text-center'>
                Friends
            </div>
            {
                Users.length === 0 ? (
                    <div >
                        You don't have any friends
                    </div>
                ) : (
                    <div className="overflow-y-scroll">
                        {Users.map((user) => <User user={user} key={user.id} />)}
                    </div>
                )
            }
        </div>
    )
}

export default ShowusersNavbar
