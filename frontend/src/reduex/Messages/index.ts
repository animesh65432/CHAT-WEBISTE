import { createSlice } from "@reduxjs/toolkit";

const Messages = createSlice({
  name: "Messages",
  initialState: {
    messagesarray: [],
  },
  reducers: {
    Getthemessages: (state, action) => {
      state.messagesarray = action.payload;
    },
    createnewmessages: (state, action) => {
      console.log(action.payload);
      let Messages = state.messagesarray;
      if (Messages.length == 0) {
        state.messagesarray = action.payload;
        console.log(state.messagesarray);
      } else {
        const [obj] = action.payload;
        state.messagesarray.push(obj);
      }
    },
  },
});
export const { Getthemessages, createnewmessages } = Messages.actions;
export default Messages.reducer;
