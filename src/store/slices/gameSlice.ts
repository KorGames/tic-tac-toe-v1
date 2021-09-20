import { createSlice } from "@reduxjs/toolkit";
import { BoardProp, PlayerSide } from "utils/interfaces";

const initialState: {
  board: BoardProp;
  result: {
    xWins: number;
    oWins: number;
    draws: number;
  };
  turn: PlayerSide;
  winner: "X" | "O" | "draw" | null;
} = {
  board: [null, null, null, null, null, null, null, null, null],
  result: {
    xWins: 0,
    oWins: 0,
    draws: 0,
  },
  turn: "O",
  winner: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    boardReset: (state) => {
      state.board = initialState.board;
      state.winner = null;
      state.turn = "O";
    },

    resultReset: (state) => {
      state.result = initialState.result;
    },
    turnSet: (state, action) => {
      state.turn = action.payload;
    },
    winnerSet: (state, { payload }: { payload: "X" | "O" | "draw" }) => {
      if (payload === "O") {
        state.result.oWins += 1;
      } else if (payload === "X") {
        state.result.xWins += 1;
      } else {
        state.result.draws += 1;
      }

      state.winner = payload;
    },
    cellSet: (
      state,
      { payload }: { payload: { id: number; data: "X" | "O" } }
    ) => {
      state.board[payload.id] = payload.data;
    },
  },
});

export default gameSlice.reducer;
export const { boardReset, turnSet, winnerSet, cellSet, resultReset } =
  gameSlice.actions;
