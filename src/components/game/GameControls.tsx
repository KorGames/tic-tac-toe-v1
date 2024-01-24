import { KorButton } from "components/Library/KorButton";
import { KorText } from "components/Library/KorText";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IPlayerSide } from "utils/interfaces";
import { theme_tokens } from "utils/styles.utils";

interface IProps {
  on_reset: () => void;
  turn: IPlayerSide;
  on_home_press: () => void;
}

export const GameControls = ({ on_reset, turn, on_home_press }: IProps) => {
  /* ******************** Hooks ******************** */
  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      <View style={styles.turn_container}>
        <KorText weight="bold" style={[styles.x_turn, turn === "X" ? styles.turn_inactive : null]}>
          X
        </KorText>
        <KorText weight="bold" style={[styles.o_turn, turn === "O" ? styles.turn_inactive : null]}>
          O
        </KorText>
      </View>
      <KorButton onPress={on_home_press}>HOME</KorButton>
      <KorButton onPress={on_reset} color="tertiary">
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
