import { IBoardValue, IPlayerSide } from "utils/interfaces";
import { board_service } from "./board.service";

const minimax = (board: IBoardValue, side: IPlayerSide, depth: number) => {
  const isMax = !(depth % 2);
  const winner = board_service.calculate_winner(board);
  if (winner) {
    if (isMax && winner === side) {
      return 100 - depth;
    } else if (!isMax && winner !== side) {
      return 100 - depth;
    } else {
      return depth - 100;
    }
  }

  if (board_service.is_board_full(board)) {
    return 0;
  }

  const availableMoves = board.map((cell, index) => (!cell ? index : null)).filter((item) => item !== null);

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

export const calculate_next_move = (board: IBoardValue, side: IPlayerSide): number => {
  const availableMoves = board.map((cell, index) => (!cell ? index : null)).filter((item) => item !== null) as number[];
  const is_my_first_move = !board.some((c) => c === side);
  if (is_my_first_move) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

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
  }
  return bestMove || availableMoves[0];
};

export const bot_service = { calculate_next_move };
