import { createSlice } from "@reduxjs/toolkit";
import { usersTypes } from "@/types/type"

interface UserSlicesTypes {
  value: usersTypes[];
}

const Users = createSlice({
  name: "users",
  initialState: {
    value: [],
    currentuseremail: localStorage.getItem("curemail") || "",
  } as UserSlicesTypes,
  reducers: {
    getalltheusers: (state, action) => {
      console.log(action.payload, "from the slices actions")
      state.value = action.payload;
    }

  },
});

export const { getalltheusers } = Users.actions;

export default Users.reducer;
