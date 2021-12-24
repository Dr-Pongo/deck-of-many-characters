import { createSlice } from "@reduxjs/toolkit";
/*  == Selected Character Slice ==  */

const selectedCharacterSlice = createSlice({
  name: "selectedCharacter",
  initialState: null,
  reducers: {
    setSelectedCharacter: (state, action) => {
      return action.payload;
    },
  },
});

export const selectSelectedCharacter = (state) => state.selectedCharacter;
export const { setSelectedCharacter } = selectedCharacterSlice.actions;
export default selectedCharacterSlice.reducer;
