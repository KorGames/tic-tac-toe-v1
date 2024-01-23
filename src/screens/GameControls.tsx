import { KorButton } from "components/Library/KorButton";
import { KorText } from "components/Library/KorText";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IPlayerSide } from "utils/interfaces";
import { theme_tokens } from "utils/styles.utils";

interface IProps {
  on_board_reset: () => void;
  turn: IPlayerSide;
}

export const GameControls = ({ on_board_reset, turn }: IProps) => {
  /* ******************** Hooks ******************** */
  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      <View style={styles.turn_container}>
        <KorText style={[styles.x_turn, turn === "X" ? styles.turn_inactive : null]}>X</KorText>
        <KorText style={[styles.o_turn, turn === "O" ? styles.turn_inactive : null]}>O</KorText>
      </View>
      <KorButton onPress={on_board_reset} color="tertiary">
        RESET
      </KorButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 320,
  },
  turn_container: {
    flexDirection: "row",
    columnGap: 10,
  },
  turn_inactive: {
    opacity: 0.3,
  },
  x_turn: {
    fontWeight: "bold",
    color: theme_tokens.primary.main,
    fontSize: 30,
  },
  o_turn: {
    fontWeight: "bold",
    color: theme_tokens.secondary.main,
    fontSize: 30,
  },
});
