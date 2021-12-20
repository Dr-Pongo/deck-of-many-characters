import { createSlice } from "@reduxjs/toolkit";

const diceTraySlice = createSlice({
  name: 'diceTray',
  initialState: { dice: [], modifier: 0},
  reducers: {
    // Add new die with the following format:
    //   { name: die, value: dieValue, key: uuidv4(), }
    addDie: (state, action) => {
      state.dice.push(action.payload);
    },
    // Remove die by key value
    removeDie: (state, action) => {
        state.dice = state.dice.filter(element => element.key !== action.payload);
    },
    updateModifier: (state, action) => {
        state.modifier = action.payload;
    },
    // Remove all dice and modifiers
    clearDiceTray: (state, action) => {
        return { dice: [], modifier: 0};
    },
  }
});

export const selectDiceTray = (state) => state.diceTray;
export const { addDie, 
                removeDie, 
                updateModifier, 
                clearDiceTray 
            } = diceTraySlice.actions;
export default diceTraySlice.reducer;