import { createSlice } from "@reduxjs/toolkit";

const Users = createSlice({
  name: "users",
  initialState: {
    value: [],
    currentuseremail: localStorage.getItem("curemail") || "",
  },
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
