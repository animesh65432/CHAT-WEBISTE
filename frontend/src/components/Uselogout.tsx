import React from 'react'
import { Card } from "@/components/ui/card"
import { RootState } from "@/reduex"
import { useSelector, useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FaRegUserCircle } from "react-icons/fa";
import { deleteidtoken } from "@/reduex/Auth"
import { useNavigate } from "react-router-dom"



const Uselogout: React.FC = () => {
    const currenuser = useSelector((state: RootState) => state.user.currentuser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handle_logout = () => {
        dispatch(deleteidtoken())
        navigate("/login")
    }

    const navigate_to_updateprofile = () => {
        navigate("/update_profile")
    }
    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Button variant="ghost">
                        {currenuser?.image ? (
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img
                                    src={currenuser.image}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img
                                    src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                                    alt="Default Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Card className='flex flex-col font-mono gap-2 p-2'>
                        <div>
                            {currenuser?.image ? <div className='relative'>
                                <img src={currenuser.image} />
                            </div> : <FaRegUserCircle className="h-[5vh] w-[5vw]" />}
                        </div>
                        <div>
                            {currenuser?.name}
                        </div>
                        <div>
                            Email:<span>{currenuser?.email}</span>
                        </div>
                        <div className='flex justify-between gap-2'>
                            <Button onClick={handle_logout}>Log out</Button>
                            <Button onClick={navigate_to_updateprofile}>Update Profile</Button>
                        </div>

                    </Card>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default Uselogout