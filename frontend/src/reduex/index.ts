import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./Auth";
import MessageReducer from "./Messages";
import Groups from "./Groups";
import users from "./users";

const stroe = configureStore({
  reducer: {
    auth: Authreducer,
    msg: MessageReducer,
    group: Groups,
    user: users,
  },
});

export default stroe;
