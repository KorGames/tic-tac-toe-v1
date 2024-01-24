import { KorText } from "components/Library/KorText";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { IPlayerSide } from "utils/interfaces";
import { theme_tokens } from "utils/styles.utils";

interface IProps {
  name: string;
  side: IPlayerSide;
  wins: number;
  turn: boolean;
  loading?: boolean;
}

export const OnlineGamePlayer = ({ name, side, wins, turn, loading }: IProps) => {
  /* ******************** Hooks ******************** */
  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      <View style={[styles.icon_container, side === "O" ? styles.o_icon_container : styles.x_icon_container]}>
        {loading ? (
          <ActivityIndicator color={theme_tokens.dark.main} />
        ) : (
          <KorText color="dark" weight="bold" style={{ fontSize: 20 }}>
            {side}
          </KorText>
        )}
      </View>
      <KorText weight="bold" style={{ fontSize: 20 }}>
        {name}
      </KorText>
      {turn && <View style={[styles.turn_container, side === "O" ? styles.o_turn_container : styles.x_turn_container]} />}
      <View style={styles.wins_container}>
        <KorText weight="bold" style={{ fontSize: 20 }}>
          {wins}
        </KorText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    columnGap: 10,
  },
  icon_container: {
    width: 35,
    height: 35,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  x_icon_container: {
    backgroundColor: theme_tokens.primary.main,
  },
  o_icon_container: {
    backgroundColor: theme_tokens.secondary.main,
  },
  wins_container: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: "auto",
    backgroundColor: theme_tokens.dark.light,
  },
  turn_container: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  x_turn_container: {
    backgroundColor: theme_tokens.primary.main,
  },
  o_turn_container: {
    backgroundColor: theme_tokens.secondary.main,
  },
});
