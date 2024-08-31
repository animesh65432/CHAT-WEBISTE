import { createContext } from "react";

const socketcontext = createContext({
  socket: null,
  connecttosocket: () => {},
});

export default socketcontext;
