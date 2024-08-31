import { createSlice } from "@reduxjs/toolkit";

interface AuthSliceState {
  idtoken: string;
}
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    idtoken: "" || localStorage.getItem("idtoken"),
  } as AuthSliceState,
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
