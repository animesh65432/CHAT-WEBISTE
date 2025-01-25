import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./Auth";
import Groups from "./Groups";
import users from "./users";
import AimessageReducer from "./Aimessages"
import UserMessageReducer from "./usermessages"
import OptionReducer from "./options"

const stroe = configureStore({
  reducer: {
    auth: Authreducer,
    group: Groups,
    user: users,
    Ai: AimessageReducer,
    userMessages: UserMessageReducer,
    option: OptionReducer
  },
});

export type RootState = ReturnType<typeof stroe.getState>;

export default stroe;
