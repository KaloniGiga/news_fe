import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectAuthState = (state: RootState) => state.auth;

export const selectUser = createSelector(selectAuthState, auth => auth.user);

export const selectAuthenticated = createSelector(selectAuthState, auth => auth.isAuthenticated);
