import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/reduex"
import { AImessagesTypes } from "@/types/type"
import { Addonemessage } from "@/reduex/Aimessages"

type useSentmessageaireturntypes = [
    loading: boolean,
    senthemesagestoai: ({ message }: { message: string }) => Promise<void>

]

const useSentmessageai = (): useSentmessageaireturntypes => {
    const [loading, setloading] = useState<boolean>(false)
    const token = useSelector((state: RootState) => state.auth.idtoken)
    const dispatch = useDispatch()

    const senthemesagestoai = async ({ message }: { message: string }) => {
        setloading(true)
        try {
            const response = await axios.post<{ message: AImessagesTypes }>(`http://localhost:3000/Aimessage/send`, {
                message
            }, {
                headers: {
                    token
                }
            })

            const messagefromai = response?.data?.message
            dispatch(Addonemessage(messagefromai))

        } catch (error) {
            console.log(`Errors in useSentmessageai hook ${error}`)
        }
        finally {
            setloading(false)
        }
    }

    return [loading, senthemesagestoai]
}


export default useSentmessageai