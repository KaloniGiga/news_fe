import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EditPostData } from "./type";

interface IPostSlice {
  editData: EditPostData | null;
}

const initialState: IPostSlice = {
  editData: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setEditData(state, action: PayloadAction<EditPostData>) {
      state.editData = action.payload;
    },
    resetEditData(state) {
      state.editData = null;
    },
  },
});

export const { setEditData, resetEditData } = postSlice.actions;
export default postSlice.reducer;
