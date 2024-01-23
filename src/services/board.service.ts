import { IBoardValue, IPlayerSide } from "utils/interfaces";

const initial_board = Array(9).fill(null);

const calculate_winner = (board: IBoardValue) => {
  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  // Check Rows
  for (const combination of winningCombinations) {
    if (combination.every((cell) => board[cell - 1] === "O")) {
      return "O";
    } else if (combination.every((cell) => board[cell - 1] === "X")) {
      return "X";
    }
  }
  return null;
};

const update_board = (board: IBoardValue, index: number, side: IPlayerSide) => {
  const new_board = [...board];
  new_board[index] = side;
  return new_board;
};

const is_board_full = (board: IBoardValue) => board.every((cell) => cell);
const is_board_empty = (board: IBoardValue) => board.every((cell) => !cell);

export const board_service = {
  calculate_winner,
  update_board,
  is_board_full,
  is_board_empty,
  initial_board,
};