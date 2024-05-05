import { createSlice } from "@reduxjs/toolkit";

const Groups = createSlice({
  name: "Groups",
  initialState: {
    value: [],
  },
  reducers: {
    addtheGrouops: (state, action) => {
      state.value = action.payload;
    },

    deleteTheGroups: (state, action) => {
      const { nameofthegroup } = action.payload;
      if (state.value.length == 0) {
        return;
      } else {
        const GropusArray = state.value;
        const deletetheArray = GropusArray.filter(
          (obj) => obj.nameofthegroup != nameofthegroup
        );

        state.value = deletetheArray;
      }
    },
    creategroupwithobject: (state, action) => {
      const GropusArray = state.value;
      GropusArray.push(action.payload);
      state.value = GropusArray;
    },
  },
});

export const { addtheGrouops, deleteTheGroups, creategroupwithobject } =
  Groups.actions;
export default Groups.reducer;
