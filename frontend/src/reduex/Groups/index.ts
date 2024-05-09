import { createSlice } from "@reduxjs/toolkit";

const Groups = createSlice({
  name: "Groups",
  initialState: {
    GroupArray: [],
    selectedGroups: undefined,
    isuserGroupAdmin: false,
    isuser: false,
  },
  reducers: {
    addtheGrouops: (state, action) => {
      state.GroupArray = action.payload;
    },
    creategroupwithobject: (state, action) => {
      const GropusArray = state.GroupArray;
      GropusArray.push(action.payload);
      state.GroupArray = GropusArray;
    },
    onselectthegroup: (state, action) => {
      state.selectedGroups = action.payload;
    },
    Getuseradmin: (state, action) => {
      state.isuserGroupAdmin = action.payload;
    },
    isuserinthegroup: (state, acion) => {
      state.isuser = acion.payload;
    },
  },
});

export const {
  addtheGrouops,
  creategroupwithobject,
  onselectthegroup,
  Getuseradmin,
  isuserinthegroup,
} = Groups.actions;
export default Groups.reducer;
