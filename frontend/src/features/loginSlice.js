import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    islogged: false,
  },
  reducers: {
    logout: (state) => {
      state.islogged = false;
    },
    login: (state) => {
      state.islogged = true;
    },
    changelogin: (state) => {
      state.islogged = !state.islogged;
    },
    changelogin1: (state) => {
      state.islogged = true;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, changelogin, changelogin1 } = loginSlice.actions;

export default loginSlice.reducer;
