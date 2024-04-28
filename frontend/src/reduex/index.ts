import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./Auth";
import MessageReducer from "./Messages";

const stroe = configureStore({
  reducer: {
    auth: Authreducer,
    msg: MessageReducer,
  },
});

export default stroe;
