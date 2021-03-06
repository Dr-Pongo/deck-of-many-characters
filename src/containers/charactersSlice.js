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
  initialState: JSON.parse(localStorage.getItem("savedCharacters")) || {},
  reducers: {
    addNewCharacter: (state, action) => {
      const newCharacters = { ...state, [action.payload.id]: action.payload };
      localStorage.setItem("savedCharacters", JSON.stringify(newCharacters));
      return newCharacters;
    },
    removeCharacter: (state, action) => {
      const newCharacters = state;
      delete newCharacters[action.payload];
      localStorage.setItem("savedCharacters", JSON.stringify(newCharacters));
      return newCharacters;
    },
    updateCharacter: (state, action) => {
      const newCharacters = { ...state, [action.payload.id]: action.payload };
      localStorage.setItem("savedCharacters", JSON.stringify(newCharacters));
      return newCharacters;
    },
  },
});

export const selectCharacters = (state) => state.characters;
export const { addNewCharacter, removeCharacter, updateCharacter } =
  charactersSlice.actions;
export default charactersSlice.reducer;
