import { configureStore } from "@reduxjs/toolkit";
import pageReducer from '../../containers/pageSlice';
import charactersReducer from '../../containers/charactersSlice'

export const store = configureStore({
  reducer: {
    page: pageReducer,
    characters: charactersReducer,
  },
});