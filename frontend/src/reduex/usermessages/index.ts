import { createSlice } from "@reduxjs/toolkit"
import { usersTypes } from "@/types/type"

interface UserChatMessageRoottypes {
    SelectedUser: usersTypes | null
}

const UserMessages = createSlice({
    name: "UserMessages",
    initialState: {
        SelectedUser: null
    } as UserChatMessageRoottypes,
    reducers: {
        changeuser: (state, action) => {
            state.SelectedUser = action.payload
        }
    }
})



export const { changeuser } = UserMessages.actions
export default UserMessages.reducer