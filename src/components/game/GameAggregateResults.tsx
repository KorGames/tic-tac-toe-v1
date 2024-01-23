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
      <View style={styles.x_wins_container}>
        <KorText>X (YOU)</KorText>
        <KorText weight="bold">{x_wins}</KorText>
      </View>
      <View style={styles.draws_container}>
        <KorText>DRAWS</KorText>
        <KorText weight="bold">{draws}</KorText>
      </View>
      <View style={styles.o_wins_container}>
        <KorText>O (BOT)</KorText>
        <KorText weight="bold">{o_wins}</KorText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 10,
  },
  x_wins_container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme_tokens.primary.main,
    width: 100,
    alignItems: "center",
  },
  o_wins_container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme_tokens.secondary.main,
    width: 100,
    alignItems: "center",
  },
  draws_container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme_tokens.tertiary.main,
    width: 100,
    alignItems: "center",
  },
});
