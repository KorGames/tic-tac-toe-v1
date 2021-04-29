import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "style";
import { FontAwesome } from "@expo/vector-icons";
import Cell from "./Cell";
import { BoardProp } from "utils/interfaces";

interface Props {
  board: any;
  setBoard: Dispatch<SetStateAction<BoardProp>>;
  turn: "X" | "O";
}

const Board: React.FC<Props> = (props) => {
  const { board, setBoard, turn } = props;

  const handlePress = (id: number) => {
    if (board[id]) {
      return;
    }
    setBoard((prevState) => ({ ...prevState, [id]: turn }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Cell
          value={board[0]}
          onPress={() => handlePress(0)}
          style={styles.cell}
        />
        <Cell
          onPress={() => handlePress(1)}
          value={board[1]}
          style={{ ...styles.cell, ...styles.verticalBorder }}
        />
        <Cell
          onPress={() => handlePress(2)}
          value={board[2]}
          style={styles.cell}
        />
      </View>
      <View style={styles.row}>
        <Cell
          onPress={() => handlePress(3)}
          value={board[3]}
          style={{ ...styles.cell, ...styles.horizontaBorder }}
        />
        <Cell
          onPress={() => handlePress(4)}
          value={board[4]}
          style={{
            ...styles.cell,
            ...styles.horizontaBorder,
            ...styles.verticalBorder,
          }}
        />
        <Cell
          onPress={() => handlePress(5)}
          value={board[5]}
          style={{ ...styles.cell, ...styles.horizontaBorder }}
        />
      </View>
      <View style={styles.row}>
        <Cell
          onPress={() => handlePress(6)}
          value={board[6]}
          style={styles.cell}
        />
        <Cell
          onPress={() => handlePress(7)}
          value={board[7]}
          style={{ ...styles.cell, ...styles.verticalBorder }}
        />
        <Cell
          onPress={() => handlePress(8)}
          value={board[8]}
          style={styles.cell}
        />
      </View>
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  verticalBorder: {
    borderRightColor: colors.dark,
    borderRightWidth: 3,
    borderLeftColor: colors.dark,
    borderLeftWidth: 3,
  },
  horizontaBorder: {
    borderTopColor: colors.dark,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderBottomColor: colors.dark,
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
