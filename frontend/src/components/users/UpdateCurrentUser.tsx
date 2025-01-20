import React, { useState, ChangeEvent } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSelector } from "react-redux"
import { RootState } from "@/reduex"
import { FaRegUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { ToastContainer, toast } from "react-toastify"
import { useUpdateprofile } from "@/hooks"

const UpdateCurrentUser: React.FC = () => {
    const User = useSelector((state: RootState) => state.user.currentuser)
    const [name, setname] = useState<string>(User?.name || "")
    const [email, setemail] = useState<string>(User?.email || "")
    const [image, setimage] = useState<string>(User?.image || "")
    const [loading, updateprofile] = useUpdateprofile()

    const handlechangeimages = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = function () {
                if (typeof reader.result === "string") {
                    setimage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const handlesubmit = async () => {
        if (image.length === 0 && email.length === 0 && name.length === 0) {
            toast.error("did not type anything")
            return
        }
        else {
            console.log(image, email, name)
            await updateprofile({ image, name, email })
            toast.success("Sucessfully update it")
        }
    }

    return (
        <div className='flex h-dvh items-center justify-center'>
            <Card className=' w-[40vw] h-[40vh] p-4 bg-blue-200 flex flex-col gap-2'>

                <div className='flex  justify-center'>
                    <div>
                        {User?.image ? <img src={image} /> : <FaRegUserCircle className='h-[10vh] w-[10vw]' />}
                    </div>
                    <div>
                        <Input type='file' onChange={handlechangeimages} />
                        <img src={image} className='w-[4vw] h-[4vh]' />
                    </div>
                </div>
                <div>
                    <label htmlFor='name'>Name</label>
                    <Input value={name} onChange={(e) => setname(e.target.value)} className='border-blue-800' />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input value={email} onChange={(e) => setemail(e.target.value)} className='border-blue-800'></Input>
                </div>
                <div className='flex justify-center' >
                    <Button className='bg-blue-600 hover:bg-blue-700' onClick={handlesubmit}>
                        {loading ? "loading" : "update"}
                    </Button>
                </div>

            </Card>
            <ToastContainer />
        </div >
    )
}

export default UpdateCurrentUser