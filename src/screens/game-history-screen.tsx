import { useFocusEffect } from "@react-navigation/native";
import { KorDivider } from "components/Library/KorDivider";
import { KorText } from "components/Library/KorText";
import { GameHistoryItem } from "components/game-history/game-history-item";
import { useAuth } from "hooks/useAuth";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { user_service } from "services/user.service";
import { IRoom } from "types/room.types";

export const GameHistoryScreen = () => {
  /* ******************** Hooks ******************** */
  const [game_history, set_game_history] = React.useState<IRoom[]>([]);
  const { user } = useAuth();
  console.log(game_history);
  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      user_service.get_game_history(user?.uid).then(set_game_history);
    }, [user])
  );

  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      <FlatList
        data={game_history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameHistoryItem item={item} />}
        ItemSeparatorComponent={() => <KorDivider />}
        ListEmptyComponent={() => <KorText>No game history</KorText>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
