import React, { useState } from 'react'
import { Aichatmessages, AichatInput } from "../Ai"

const Aichat: React.FC = () => {
    const [inputloading, setinputloading] = useState<boolean>(false)
    const handletheinputloading = (loading: boolean) => {
        setinputloading(loading)
        console.log(inputloading, "inputloading")
    }

    return (
        <div className='flex flex-col'>
            <div className=' overflow-auto h-[80vh]'>
                <Aichatmessages inputloading={inputloading} />
            </div>
            <div>
                <AichatInput GetTheinputloading={handletheinputloading} />
            </div>
        </div>
    )
}

export default Aichat