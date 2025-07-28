import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../types/auth";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  lastAuthCheck: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.lastAuthCheck = Date.now();
    },
    
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.lastAuthCheck = Date.now();
    },
    
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.lastAuthCheck = Date.now();
    },
  },
});

export const { logIn, logOut, updateUser, updateToken } = authSlice.actions;
export default authSlice.reducer;
