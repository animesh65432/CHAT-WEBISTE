import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    idtoken: "" || localStorage.getItem("idtoken"),
  },
  reducers: {
    addthetoken: (state, action) => {
      state.idtoken = action.payload;
      localStorage.setItem("idtoken", action.payload);
    },
    deleteidtoken: (state, action) => {
      console.log(action.payload);
      state.idtoken = "";
      localStorage.removeItem("idtoken");
    },
  },
});

export const { addthetoken, deleteidtoken } = AuthSlice.actions;
export default AuthSlice.reducer;
