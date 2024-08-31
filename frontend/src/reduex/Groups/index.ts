import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Group {
  id: number;
  nameofthegroup: string;
}

interface GroupsState {
  GroupArray: Group[];
  selectedGroups: Group | null;
  isuserGroupAdmin: boolean;
  isuser: boolean;
}

const initialState: GroupsState = {
  GroupArray: [],
  selectedGroups: null,
  isuserGroupAdmin: false,
  isuser: false,
};

const Groups = createSlice({
  name: "Groups",
  initialState,
  reducers: {
    addtheGrouops: (state, action: PayloadAction<Group[]>) => {
      state.GroupArray = action.payload;
    },
    creategroupwithobject: (state, action: PayloadAction<Group>) => {
      state.GroupArray.push(action.payload);
    },
    onselectthegroup: (state, action: PayloadAction<Group>) => {
      state.selectedGroups = action.payload;
    },
    Getuseradmin: (state, action: PayloadAction<boolean>) => {
      state.isuserGroupAdmin = action.payload;
    },
    isuserinthegroup: (state, action: PayloadAction<boolean>) => {
      state.isuser = action.payload;
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
