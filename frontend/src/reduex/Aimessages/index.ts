import { createSlice } from "@reduxjs/toolkit"
import { AImessagesTypes } from "../../types/type"

interface initialStateTypes {
    messages: AImessagesTypes[],

}


const AiMessages = createSlice({
    name: "Ai",
    initialState: {
        messages: [],
        inputsentloading: false,
        Getallmessagesloading: false
    } as initialStateTypes
    ,
    reducers: {
        Getallmessages: (state, action) => {
            state.messages = action.payload
        },
        Addonemessage: (state, action) => {
            const message = action.payload
            state.messages.push(message)
        },

    }
})

export const { Getallmessages, Addonemessage } = AiMessages.actions

export default AiMessages.reducer