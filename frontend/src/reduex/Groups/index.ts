import { createSlice } from "@reduxjs/toolkit";

const Groups = createSlice({
  name: "Groups",
  initialState: {
    value: [],
    selectedGroups: undefined,
    isuserGroupAdmin: false,
  },
  reducers: {
    addtheGrouops: (state, action) => {
      state.value = action.payload;
    },
    creategroupwithobject: (state, action) => {
      const GropusArray = state.value;
      GropusArray.push(action.payload);
      state.value = GropusArray;
    },
    onselectthegroup: (state, action) => {
      state.selectedGroups = action.payload;
    },
    Getuseradmin: (state, action) => {
      state.isuserGroupAdmin = action.payload;
    },
  },
});

export const {
  addtheGrouops,
  creategroupwithobject,
  onselectthegroup,
  Getuseradmin,
} = Groups.actions;
export default Groups.reducer;
