import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  result: boolean;
} = {
  result: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showResultModal: (state, { payload }: { payload: boolean }) => {
      state.result = payload;
    },
  },
});

export default modalSlice.reducer;
export const { showResultModal } = modalSlice.actions;
