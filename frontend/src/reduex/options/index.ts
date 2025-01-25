import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OptionsState {
    messages: boolean;
    group: boolean;
    ai: boolean;
}

const initialState: OptionsState = {
    messages: false,
    group: false,
    ai: false,
};

const Optionslices = createSlice({
    name: "options",
    initialState,
    reducers: {
        handleToggle(state, action: PayloadAction<keyof OptionsState>) {
            const key = action.payload;
            console.log(key, "action")
            if (key === "ai") {
                state.messages = false;
                state.group = false;
                state.ai = true;
            } else if (key === "group") {
                state.messages = false;
                state.group = true;
                state.ai = false;
            } else if (key === "messages") {
                state.messages = true;
                state.group = false;
                state.ai = false;
            }
        }
    }
});

export const { handleToggle } = Optionslices.actions;
export default Optionslices.reducer;
