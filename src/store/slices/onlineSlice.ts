import { createSlice } from "@reduxjs/toolkit";
import { BoardProp } from "utils/interfaces";
const initialState: {
  user: string | null;
  room: {
    id: string;
    board: BoardProp;
    players: {
      X: string | null;
      O: string | null;
    };
    turn: "X" | "O";
    winner: "X" | "O" | "draw";
  } | null;
} = {
  user: null,
  room: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    roomSet: (state, { payload }) => {
      state.room = payload;
    },
    userSet: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export default modalSlice.reducer;
export const { roomSet, userSet } = modalSlice.actions;
