import { checkWin, isBoardFull } from "lib/board";
import { BoardProp } from "utils/interfaces";

const minimax = (board: BoardProp, side: "X" | "O", depth: number) => {
  const isMax = !(depth % 2);
  const win = checkWin(board);
  if (win) {
    if (isMax && win === side) {
      return 100 - depth;
    } else if (!isMax && win !== side) {
      return 100 - depth;
    } else {
      return depth - 100;
    }
  }

  if (isBoardFull(board)) {
    return 0;
  }

  const availableMoves = board
    .map((cell, index) => (!cell ? index : null))
    .filter((item) => item !== null);

  if (isMax) {
    let best = -100;

    for (const availableMove of availableMoves) {
      const nextBoard = [...board];
      nextBoard[availableMove!] = side;
      const nextSide = side === "O" ? "X" : "O";
      const minMaxScore = minimax(nextBoard, nextSide, depth + 1);
      best = Math.max(best, minMaxScore);
    }
    return best;
  } else {
    let best = 100;

    for (const availableMove of availableMoves) {
      const nextBoard = [...board];
      nextBoard[availableMove!] = side;
      const nextSide = side === "O" ? "X" : "O";
      const minMaxScore = minimax(nextBoard, nextSide, depth + 1);
      best = Math.min(best, minMaxScore);
    }
    return best;
  }
};

export const getHardMove = (board: BoardProp, side: "X" | "O") => {
  const availableMoves = board
    .map((cell, index) => (!cell ? index : null))
    .filter((item) => item !== null);

  let bestValue = 100;
  let bestMove = null;
  for (const availableMove of availableMoves) {
    const nextBoard = [...board];
    nextBoard[availableMove!] = side;
    const nextSide = side === "O" ? "X" : "O";
    const minMaxValue = minimax(nextBoard, nextSide, 0);
    if (minMaxValue < bestValue) {
      bestValue = minMaxValue;
      bestMove = availableMove;
    }
    console.log(availableMove, minMaxValue, bestValue);
    // console.log(bestMove)
  }
  // console.log("\n");
  return bestMove;
};
