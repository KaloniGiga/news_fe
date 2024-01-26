import { useSelector } from "react-redux";
import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const selectPost = (state: RootState) => state.post;
export const ediDataSelector = createSelector(selectPost, posts => posts);
