import { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "@/reduex"
import { Getallmessages } from "@/reduex/Aimessages"
import { AImessagesTypes } from "@/types/type"

type useGetallaimessagesreturntypes = [
    loading: boolean,
    getaimessages: () => Promise<void>
]

const useGetallaimessages = (): useGetallaimessagesreturntypes => {
    const [loading, setloading] = useState<boolean>(false)
    const token = useSelector((state: RootState) => state.auth.idtoken)
    const dispatch = useDispatch()

    const getaimessages = async () => {
        setloading(true)
        try {
            let response = await axios.get<{ messages: AImessagesTypes[] }>(`http://localhost:3000/Aimessage/Get`, {
                headers: {
                    token
                }
            })
            const Prevaimessages = response?.data?.messages
            dispatch(Getallmessages(Prevaimessages))
        } catch (error) {
            console.log(error, `Got errors from useGetallaimessages hoosk ${error}`)
        }
        finally {
            setloading(false)
        }
    }

    return [loading, getaimessages]
}

export default useGetallaimessages