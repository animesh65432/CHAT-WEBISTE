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
        <div className='flex items-center justify-center h-[80vh]'>
            <Card className=' lg:w-[40vw] lg:h-[45vh] w-[50vw] h-[44vh] p-4 bg-white flex flex-col gap-2 '>
                <div className='flex  justify-center '>
                    <div>
                        {User?.image ? <div className='relative md:w-[15vw] md:h-[15vh] w-[10vw] h-[10vh]'  >
                            <img src={image} className='absolute' />
                        </div> : <FaRegUserCircle className='h-[10vh] w-[10vw]' />}
                    </div>
                    <div>
                        <Input type='file' onChange={handlechangeimages} />
                        <div className='relative w-[2vh] h-[2vw]' >
                            <img src={image} className=' absolute' />
                        </div>
                    </div>
                </div>
                <div className='mt-3' >
                    <label htmlFor='name'>Name</label>
                    <Input value={name} onChange={(e) => setname(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input value={email} onChange={(e) => setemail(e.target.value)} ></Input>
                </div>
                <div className='flex justify-center' >
                    <Button onClick={handlesubmit}>
                        {loading ? "loading" : "update"}
                    </Button>
                </div>

            </Card>
            <ToastContainer />
        </div >
    )
}

export default UpdateCurrentUser