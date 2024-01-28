import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "./type";

interface IAuthSlice {
  isAuthenticated: boolean;
  user: IUser | null;
}

const initialState: IAuthSlice = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    resetAuthUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthUser, resetAuthUser } = authSlice.actions;
export default authSlice.reducer;
