import { IGameV2BoardValue, IGameV2PlayerPiece, IGameV2PlayerSide } from "types/game-v2.types";
import { game_v2_board_service } from "./game-v2-board.service";

const calculate_next_move_easy = (side: IGameV2PlayerSide, pieces: IGameV2PlayerPiece[], board: IGameV2BoardValue) => {
  const moves = game_v2_board_service.get_available_moves(board);
  const available_pieces = Object.values(pieces).filter((value) => value.side === side && value.available);

  return {
    cellId: moves[Math.floor(moves.length * Math.random())],
    piece: available_pieces[Math.floor(available_pieces.length * Math.random())],
  };
};

const prevent = (board: IGameV2BoardValue, pieces: IGameV2PlayerPiece[], side: IGameV2PlayerSide, depth: number) => {
  // If depth is even than its the max side
  const isMax = !(depth % 2);

  // Check if game is complete
  if (game_v2_board_service.check_draw(pieces, board, side)) return 0;
  const win = game_v2_board_service.check_win(board);

  if (win) {
    if (isMax && win.side === side) {
      return 20 - depth;
    } else if (!isMax && win.side !== side) {
      return 20 - depth;
    } else {
      return depth - 20;
    }
  }

  let available_pieces = pieces.filter((value) => value.side === side && value.available);
  const maxAvailableValue = Math.max(...available_pieces.map((item) => item.value));

  let availableEmptyMoves = game_v2_board_service.get_available_moves(board);
  let availableTakeOverMoves = board
    .map((key) => key?.id)
    .filter((key) => {
      const boardValue = board[key!];
      boardValue && boardValue.value < maxAvailableValue;
    });

  if (isMax) {
    let best = -100;
    for (const availableEmptyMove of availableEmptyMoves) {
      for (const avaialablePiece of available_pieces) {
        const nextBoard = { ...board, [availableEmptyMove]: avaialablePiece };
        const nextAvaialablePieces = pieces;
        delete nextAvaialablePieces[avaialablePiece.id];
        const nextTurn = side === "blue" ? "red" : "blue";

        best = Math.max(best, prevent(nextBoard, nextAvaialablePieces, nextTurn, depth + 1));
      }
    }
    return best;
  } else {
    let best = 100;
    for (const availableEmptyMove of availableEmptyMoves) {
      for (const avaialablePiece of available_pieces) {
        const nextBoard = { ...board, [availableEmptyMove]: avaialablePiece };
        const nextAvaialablePieces = pieces;
        delete nextAvaialablePieces[avaialablePiece.id];
        const nextTurn = side === "blue" ? "red" : "blue";

        best = Math.max(best, prevent(nextBoard, nextAvaialablePieces, nextTurn, depth + 1));
      }
    }
    return best;
  }
};

export const calculate_next_move_hard = (side: IGameV2PlayerSide, pieces: IGameV2PlayerPiece[], board: IGameV2BoardValue) => {
  let avaialablePieces = Object.values(pieces).filter((value) => value.side === side && value.available);

  const maxAvailableValue = Math.max(...avaialablePieces.map((item) => item.value));

  let availableEmptyMoves = game_v2_board_service.get_available_moves(board);
  let availableTakeOverMoves = Object.keys(board)
    .map((key) => Number(key))
    .filter((key) => {
      const boardValue = board[key];
      boardValue && boardValue.value < maxAvailableValue;
    });

  let value = -99;
  let returnMove;

  for (const availableEmptyMove of availableEmptyMoves) {
    for (const avaialablePiece of avaialablePieces) {
      const minMaxValue = prevent(board, pieces, side, 0);
      if (value < minMaxValue) {
        value = minMaxValue;
        returnMove = { cellId: availableEmptyMove, piece: avaialablePiece };
      }
      console.log(minMaxValue, {
        cellId: availableEmptyMove,
        piece: avaialablePiece,
      });
      console.log("\n");
    }
  }
  return returnMove || { cellId: availableEmptyMoves[0], piece: avaialablePieces[0] };
};
export const game_v2_bot_service = {
  calculate_next_move_easy,
  calculate_next_move_hard,
};
