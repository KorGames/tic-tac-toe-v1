import { IGameV2BoardValue, IGameV2PlayerPiece, IGameV2PlayerSide } from "types/game-v2.types";

const initial_board = Array(9).fill(null);
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const get_available_moves = (board: IGameV2BoardValue) => {
  return Object.keys(board)
    .map((item) => Number(item))
    .filter((key) => !board[key]);
};

const player_has_moves = (side: IGameV2PlayerSide, pieces: IGameV2PlayerPiece[], board: IGameV2BoardValue) => {
  const available_pieces = pieces.filter((value) => value.side === side && value.available);
  const opponent_spots = board.filter((value) => value?.side !== side);

  for (const piece of available_pieces) {
    if (opponent_spots.some((spot) => spot!.value < piece.value)) {
      return true;
    }
  }
  return false;
};

const check_draw = (pieces: IGameV2PlayerPiece[], board: IGameV2BoardValue, turn: IGameV2PlayerSide) => {
  const is_board_full = Object.values(board).every((value) => value);
  const out_of_pieces = Object.values(pieces).every((item) => !item.available);

  if (out_of_pieces || (is_board_full && !player_has_moves(turn, pieces, board))) {
    return true;
  }
  return false;
};

const checkSet = (set: number[], side: string, board: IGameV2BoardValue) => {
  if ([board[set[0]], board[set[1]], board[set[2]]].every((item) => item && item.side === side)) {
    return true;
  }
  return false;
};

const check_win = (board: IGameV2BoardValue) => {
  const sides: IGameV2PlayerSide[] = ["O", "X"];

  for (const side of sides) {
    for (const winning_combination of winning_combinations) {
      const result = checkSet(winning_combination, side, board);
      if (result) {
        return { side, winning_combination };
      }
    }
  }
  return false;
};

const update_board = (board: IGameV2BoardValue, cellId: number, piece: IGameV2PlayerPiece) => {
  const new_board = [...board];
  new_board[cellId] = piece;
  return new_board;
};

export const game_v2_board_service = {
  initial_board,
  get_available_moves,
  check_draw,
  check_win,
  update_board,
};
