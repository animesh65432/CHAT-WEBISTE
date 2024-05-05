import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./Auth";
import MessageReducer from "./Messages";
import Groups from "./Groups";

const stroe = configureStore({
  reducer: {
    auth: Authreducer,
    msg: MessageReducer,
    group: Groups,
  },
});

export default stroe;
