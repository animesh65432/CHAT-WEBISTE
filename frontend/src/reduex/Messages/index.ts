import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {}

interface MessagesState {
  messagesarray: Message[];
}

const loadMessagesFromLocalStorage = (): Message[] => {
  const storedMessagesString = localStorage.getItem("messages");
  if (storedMessagesString === null) {
    return [];
  }
  const storedMessages: Message[] = JSON.parse(storedMessagesString);
  return storedMessages;
};

const initialState: MessagesState = {
  messagesarray: loadMessagesFromLocalStorage(),
};

const Messages = createSlice({
  name: "Messages",
  initialState,
  reducers: {
    Getthemessages: (state, action: PayloadAction<Message[]>) => {
      state.messagesarray = action.payload;
    },
    createnewmessages: (state, action: PayloadAction<Message[]>) => {
      const newMessages = action.payload;
      if (state.messagesarray.length === 0) {
        state.messagesarray = newMessages;
      } else {
        state.messagesarray.push(...newMessages);
      }
    },
  },
});

export const { Getthemessages, createnewmessages } = Messages.actions;
export default Messages.reducer;
