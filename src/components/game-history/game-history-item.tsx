import { KorText } from "components/Library/KorText";
import { useAuth } from "hooks/useAuth";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IRoom } from "types/room.types";
import moment from "moment";
import { theme_tokens } from "utils/styles.utils";

interface IProps {
  item: IRoom;
}

export const GameHistoryItem = ({ item }: IProps) => {
  /* ******************** Hooks ******************** */
  const { user } = useAuth();
  /* ******************** Variables ******************** */
  const is_x_player = item.x_player_id === user?.uid;
  const auth_wins = is_x_player ? item.x_player_wins : item.o_player_wins;
  const opponent_wins = is_x_player ? item.o_player_wins : item.x_player_wins;
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      <View style={styles.title_container}>
        <KorText weight="bold" size="lg">
          Played {is_x_player ? "X" : "O"}
        </KorText>
        <KorText>{moment(item.created_date).format("L")}</KorText>
      </View>
      <View style={styles.results_container}>
        <View style={[styles.result_container, { backgroundColor: theme_tokens.primary.main }]}>
          <KorText color="dark">Wins: {auth_wins}</KorText>
        </View>
        <View style={[styles.result_container, { backgroundColor: theme_tokens.secondary.main }]}>
          <KorText color="dark">Losses: {opponent_wins}</KorText>
        </View>
        <View style={[styles.result_container, { backgroundColor: theme_tokens.tertiary.main }]}>
          <KorText color="dark">Draws: {item.draws}</KorText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  results_container: {
    flexDirection: "row",
    columnGap: 10,
  },
  result_container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
