import { configureStore } from "@reduxjs/toolkit";
import pageSlice from './pageSlice.js';

export const store = configureStore({
  reducer: {
    page: pageSlice,
  },
});