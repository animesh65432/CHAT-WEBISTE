import { createSlice } from "@reduxjs/toolkit";
import { usersTypes } from "@/types/type"

type CurrentUserTypes = {
  id: number;
  email: string;
  name: string;
  image: string
}

interface UserSlicesTypes {
  value: usersTypes[];
  currentuser: CurrentUserTypes | null
}

const Users = createSlice({
  name: "users",
  initialState: {
    value: [],
    currentuser: null
  } as UserSlicesTypes,
  reducers: {
    getalltheusers: (state, action) => {
      console.log(action.payload, "from the slices actions")
      state.value = action.payload;
    },
    setthecurrentuser: (state, action) => {
      state.currentuser = action.payload
    }

  },
});

export const { getalltheusers, setthecurrentuser } = Users.actions;

export default Users.reducer;
