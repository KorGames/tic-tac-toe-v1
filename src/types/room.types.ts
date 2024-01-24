import { IBoardValue, IPlayerSide } from "utils/interfaces";

export interface IRoom {
  id: string;
  board: IBoardValue;
  x_player_id: string | null;
  x_player_wins: number;
  x_player_left: boolean;
  o_player_id: string | null;
  o_player_wins: number;
  o_player_left: boolean;
  draws: number;
  turn: IPlayerSide;
  last_move_cell: number | null;
  created_by: string;
  created_date: string;
}
