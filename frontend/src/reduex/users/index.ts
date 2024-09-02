import { createSlice } from "@reduxjs/toolkit";

type usersTypes = { id?: number; name: string; email: string };

interface UserSlicesTypes {
  value: usersTypes[];
  currentuseremail: string;
}

const Users = createSlice({
  name: "users",
  initialState: {
    value: [],
    currentuseremail: localStorage.getItem("curemail") || "",
  } as UserSlicesTypes,
  reducers: {
    getalltheusers: (state, action) => {
      state.value = action.payload;
    },
    getTheCurrentuseremail: (state, action) => {
      state.currentuseremail = action.payload;
      localStorage.setItem("curemail", action.payload);
    },
    
  },
});

export const { getalltheusers, getTheCurrentuseremail } = Users.actions;

export default Users.reducer;
