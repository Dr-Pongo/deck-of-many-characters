import { createSlice } from "@reduxjs/toolkit";
/*  == Page Slice ==  */

export const HOME_PAGE = 'HOME_PAGE'
export const CREATE_PAGE = 'CREATE_PAGE'
export const EDIT_PAGE = 'EDIT_PAGE'
export const PLAY_PAGE = 'PLAY_PAGE'

const pageSlice = createSlice({
  name: 'page',
  initialState: HOME_PAGE,
  reducers: {
    gotoPage: (state, action) => {
      return action.payload;
    },
  }
});

export const selectPage = (state) => state.page;
export const { gotoPage } = pageSlice.actions;
export default pageSlice.reducer;