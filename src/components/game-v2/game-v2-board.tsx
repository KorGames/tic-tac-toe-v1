import React from "react";
import { StyleSheet, View } from "react-native";
import { IGameV2BoardValue } from "types/game-v2.types";
import { GameV2BoardCell } from "./game-v2-board-cell";

interface IProps {
  board: IGameV2BoardValue;
  on_cell_press: (cell_index: number) => void;
}

export const GameV2Board = ({ board, on_cell_press }: IProps) => {
  /* ******************** Hooks ******************** */
  const [board_width, _set_board_width] = React.useState(1);

  /* ******************** Variables ******************** */
  const cell_size = React.useMemo(() => (board_width - 20) / 3, [board_width]);

  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={styles.container} onLayout={(e) => _set_board_width(e.nativeEvent.layout.width)}>
      {board.map((value, index) => (
        <GameV2BoardCell key={index} value={value} size={cell_size} on_cell_press={() => on_cell_press(index)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    rowGap: 10,
    flexWrap: "wrap",
  },
});
