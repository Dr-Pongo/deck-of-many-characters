import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../../containers/pageSlice";
import charactersReducer from "../../containers/charactersSlice";
import selectedCharacterReducer from "../../containers/selectedCharacterSlice";
import diceTrayReducer from "../../containers/diceTraySlice";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    characters: charactersReducer,
    selectedCharacter: selectedCharacterReducer,
    diceTray: diceTrayReducer,
  },
});
