import React from "react";
import { StyleSheet, View } from "react-native";
import { theme_tokens } from "utils/styles.utils";
import { KorText } from "components/Library/KorText";

interface IProps {
  x_wins: number;
  o_wins: number;
  draws: number;
}

export const GameAggregateResults = ({ x_wins, o_wins, draws }: IProps) => {
  /* ******************** Hooks ******************** */
  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      <View style={[styles.result_container, styles.x_wins_container]}>
        <KorText color="dark">X (YOU)</KorText>
        <KorText weight="bold" color="dark">
          {x_wins}
        </KorText>
      </View>
      <View style={[styles.result_container, styles.draws_container]}>
        <KorText color="dark">DRAWS</KorText>
        <KorText weight="bold" color="dark">
          {draws}
        </KorText>
      </View>
      <View style={[styles.result_container, styles.o_wins_container]}>
        <KorText color="dark">O (BOT)</KorText>
        <KorText weight="bold" color="dark">
          {o_wins}
        </KorText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 10,
  },
  result_container: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  x_wins_container: {
    backgroundColor: theme_tokens.primary.main,
  },
  o_wins_container: {
    backgroundColor: theme_tokens.secondary.main,
  },
  draws_container: {
    backgroundColor: theme_tokens.tertiary.main,
  },
});
