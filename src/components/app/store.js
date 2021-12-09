import { configureStore } from "@reduxjs/toolkit";
import { pageSlice, selectPage } from './pageSlices.js';

export const store = configureStore({
  reducer: {
    page: pageSlice,

  },
});