import { BoardProp } from "utils/interfaces";

const isBoardFull = (board: BoardProp) => board.every((cell) => cell);
export default isBoardFull;
