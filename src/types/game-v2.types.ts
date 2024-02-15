export type IGameV2BoardValue = IGameV2CellValue[];

export type IGameV2PlayerSide = "O" | "X";

export type IGameV2CellValue = IGameV2PlayerPiece | null;

export type IGameV2Result = IGameV2PlayerSide | "draw" | null;

export interface IGameV2Piece {
  value: number;
  side: IGameV2PlayerSide;
}

export interface IGameV2PlayerPiece extends IGameV2Piece {
  id: number;
  available: boolean;
}
