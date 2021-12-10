import { createSlice } from "@reduxjs/toolkit";
/*  == Page Slice ==
 *  Trying to be clever with named actions instead of
 *   the need to comment on each dispatch payload number means
 * 
 *  With that being said, page values are:
 *  0: Home Page
 *  1: Character Create Page
 *  2: Character Edit Page
 *  3: Play page
 * 
 */
export const pageSlice = createSlice({
  name: 'page',
  initialState: 0,
  reducers: {
    gotoHomePage: (state, action) => {
        state = 0;
    },
    gotoCreatePage: (state, action) => {
        state = 1;
    },
    gotoEditPage: (state, action) => {
        state = 2;
    },
    gotoPlayPage: (state, action) => {
        state = 3;
    },
  },
});

export const selectPage = (state) => state.page;
export const { gotoHomePage, gotoCreatePage, gotoEditPage, gotoPlayPage } = pageSlice.actions;
export default pageSlice.reducer;