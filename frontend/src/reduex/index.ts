import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./Auth";

const stroe = configureStore({
  reducer: {
    auth: Authreducer,
  },
});

export default stroe;
