import React from "react";
import { StyleSheet, View } from "react-native";
import { GameBoardCell } from "./GameBoardCell";
import { IBoardValue } from "types/game.types";

interface IProps {
  board: IBoardValue;
  on_cell_press: (index: number) => void;
  last_move_cell: number | null;
}

export const GameBoard = ({ board, on_cell_press, last_move_cell }: IProps) => {
  const [board_width, _set_board_width] = React.useState(1);

  const cell_size = React.useMemo(() => (board_width - 20) / 3, [board_width]);

  return (
    <View style={styles.container} onLayout={(e) => _set_board_width(e.nativeEvent.layout.width)}>
      <View style={styles.row_container}>
        {[0, 1, 2].map((index) => (
          <GameBoardCell
            key={index}
            value={board[index]}
            on_cell_press={() => on_cell_press(index)}
            size={cell_size}
            highlighted={last_move_cell === index}
          />
        ))}
      </View>
      <View style={styles.row_container}>
        {[3, 4, 5].map((index) => (
          <GameBoardCell
            key={index}
            value={board[index]}
            on_cell_press={() => on_cell_press(index)}
            size={cell_size}
            highlighted={last_move_cell === index}
          />
        ))}
      </View>
      <View style={styles.row_container}>
        {[6, 7, 8].map((index) => (
          <GameBoardCell
            key={index}
            value={board[index]}
            on_cell_press={() => on_cell_press(index)}
            size={cell_size}
            highlighted={last_move_cell === index}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
  },
  row_container: {
    flexDirection: "row",
    columnGap: 10,
  },
});
