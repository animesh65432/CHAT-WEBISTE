import React, { ReactNode, useState, createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { baseurl } from "../utils";

type SocketContextType = {
  socket: Socket | null;
  connecttosocket: () => void;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const SocketProvider: React.FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connecttosocket = () => {
    if (!socket) {
      const socketInstance = io(baseurl, { withCredentials: true });
      setSocket(socketInstance);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, connecttosocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export default SocketProvider;
