import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "style";
import Cell from "./Cell";
import { BoardProp } from "utils/interfaces";
import { HStack, VStack } from "native-base";

interface Props {
  board: BoardProp;
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
    <VStack
      space={5}
      flex={1}
      backgroundColor="tertiary.800"
      padding={5}
      borderRadius={10}
    >
      <HStack space={5} flex={1}>
        <Cell onPress={() => handlePress(0)} value={board[0]} />
        <Cell onPress={() => handlePress(1)} value={board[1]} />
        <Cell onPress={() => handlePress(2)} value={board[2]} />
      </HStack>
      <HStack space={5} flex={1}>
        <Cell onPress={() => handlePress(3)} value={board[3]} />
        <Cell onPress={() => handlePress(4)} value={board[4]} />
        <Cell onPress={() => handlePress(5)} value={board[5]} />
      </HStack>
      <HStack space={5} flex={1}>
        <Cell onPress={() => handlePress(6)} value={board[6]} />
        <Cell onPress={() => handlePress(7)} value={board[7]} />
        <Cell onPress={() => handlePress(8)} value={board[8]} />
      </HStack>
    </VStack>
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
