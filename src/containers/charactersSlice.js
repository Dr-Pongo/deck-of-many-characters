import { createSlice } from "@reduxjs/toolkit";
/*
 * characterSlice holds a list of all current characters
 *
 * This will be stored locally, but eventually I'd like a google auth to store
 *  info in a database or somesuch option cus that's cool
 *
 */

const charactersSlice = createSlice({
  name: "characters",
  initialState: {},
  reducers: {
    addNewCharacter: (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    },
    removeCharacter: (state, action) => {
      delete state[action.payload];
    },
  },
});

export const selectCharacters = (state) => state.characters;
export const { addNewCharacter, removeCharacter } = charactersSlice.actions;
export default charactersSlice.reducer;
