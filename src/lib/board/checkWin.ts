import { BoardProp } from "utils/interfaces";

const checkWin = (board: BoardProp) => {
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

export default checkWin;
