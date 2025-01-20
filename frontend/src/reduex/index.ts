import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./Auth";
import Groups from "./Groups";
import users from "./users";
import AimessageReducer from "./Aimessages"
import UserMessageReducer from "./usermessages"

const stroe = configureStore({
  reducer: {
    auth: Authreducer,
    group: Groups,
    user: users,
    Ai: AimessageReducer,
    userMessages: UserMessageReducer
  },
});

export type RootState = ReturnType<typeof stroe.getState>;

export default stroe;
