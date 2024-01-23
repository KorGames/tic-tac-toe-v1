import React from "react";
import { StyleSheet, View } from "react-native";
import { GameBoardCell } from "./GameBoardCell";
import { IBoardValue } from "utils/interfaces";

interface IProps {
  board: IBoardValue;
  on_cell_press: (index: number) => void;
}

export const GameBoard = ({ board, on_cell_press }: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row_container}>
        <GameBoardCell value={board[0]} on_cell_press={() => on_cell_press(0)} />
        <GameBoardCell value={board[1]} on_cell_press={() => on_cell_press(1)} />
        <GameBoardCell value={board[2]} on_cell_press={() => on_cell_press(2)} />
      </View>
      <View style={styles.row_container}>
        <GameBoardCell value={board[3]} on_cell_press={() => on_cell_press(3)} />
        <GameBoardCell value={board[4]} on_cell_press={() => on_cell_press(4)} />
        <GameBoardCell value={board[5]} on_cell_press={() => on_cell_press(5)} />
      </View>
      <View style={styles.row_container}>
        <GameBoardCell value={board[6]} on_cell_press={() => on_cell_press(6)} />
        <GameBoardCell value={board[7]} on_cell_press={() => on_cell_press(7)} />
        <GameBoardCell value={board[8]} on_cell_press={() => on_cell_press(8)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  row_container: {
    flexDirection: "row",
    columnGap: 10,
  },
});
