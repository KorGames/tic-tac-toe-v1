import { useFocusEffect, useNavigation } from "@react-navigation/core";
import React, { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { room_service } from "services/room.service";
import { IRoom } from "types/room.types";
import { MainRouterScreenProps } from "types/navigation";
import { GameBoard } from "components/Game/GameBoard";
import { board_service } from "services/board.service";
import { SafeAreaView } from "react-native-safe-area-context";
import { KorButton } from "components/Library/KorButton";
import { OnlineGamePlayer } from "components/OnlineGame/OnlineGamePlayer";
import { useAsyncPrompt } from "hooks/useAsyncPrompt";
import { bot_service } from "services/bot.service";
import { useAuth } from "hooks/useAuth";

export const OnlineGameScreen = () => {
  /* ******************** Hooks ******************** */
  const navigation = useNavigation<MainRouterScreenProps<"OnlineGame">["navigation"]>();
  const [room_id, _set_room_id] = useState<string | null>(null);
  const [room, _set_room] = useState<IRoom | null>(null);
  const { start_async_prompt } = useAsyncPrompt();
  const { user } = useAuth();

  /* ******************** Variables ******************** */
  const auth_user_id = user?.uid;
  const auth_user_side = room?.x_player_id === auth_user_id ? "X" : "O";
  const auth_user_wins = auth_user_side === "X" ? room?.x_player_wins : room?.o_player_wins;

  const opponent_id = auth_user_side === "X" ? room?.o_player_id : room?.x_player_id;
  const opponent_side = auth_user_side === "X" ? "O" : "X";
  const opponent_wins = auth_user_side === "X" ? room?.o_player_wins : room?.x_player_wins;
  const opponent_left = auth_user_side === "X" ? room?.o_player_left : room?.x_player_left;
  const opponent_is_ai = room?.o_player_id === "AI";

  /* ******************** Functions ******************** */
  const on_home_press = async () => {
    try {
      if (room_id) {
        room_service.exit_room(room_id);
      }
    } catch (error) {}
    navigation.navigate("Home");
  };

  const add_ai_player = useCallback(
    async (room_id: string) => {
      if (room?.o_player_id && room.x_player_id) return;
      room_service.ai_join_room(room_id).catch((err) => console.log(err));
    },
    [room?.o_player_id, room?.x_player_id]
  );

  /* ******************** Effects ******************** */
  useFocusEffect(
    useCallback(() => {
      let unsubscribe = () => {};
      if (!room_id) return;
      unsubscribe = room_service.on_room_change(room_id, (room) => {
        _set_room(room);
      });

      return () => unsubscribe();
    }, [room_id])
  );

  useFocusEffect(
    useCallback(() => {
      if (room_id) return;
      room_service
        .find_room()
        .then((room_id) => {
          _set_room_id(room_id);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (!room_id || !opponent_id || !opponent_side) return;
      if (opponent_is_ai && room?.turn === opponent_side) {
        const ai_move = bot_service.calculate_next_move(room.board, room.turn);
        setTimeout(() => {
          room_service.make_move(room_id, ai_move, opponent_id).catch((err) => console.log(err));
        }, 1000);
      }
    }, [opponent_is_ai, room?.turn, opponent_side, opponent_id])
  );

  useFocusEffect(
    useCallback(() => {
      if (!room_id) return;
      setTimeout(() => {
        add_ai_player(room_id);
      }, 1000 * 5); // 10 seconds
    }, [room_id])
  );

  useFocusEffect(
    useCallback(() => {
      if (!room_id) return;
      if (opponent_left) {
        start_async_prompt({
          title: "Opponent left",
          description: "Opponent left the game",
          hide_cancel: true,
          confirm_text: "Ok",
        }).then(() => {
          room_service.exit_room(room_id);
          navigation.navigate("Home");
        });
      }
    }, [opponent_left])
  );

  return (
    <SafeAreaView style={styles.container}>
      <OnlineGamePlayer name="Opponent" side={opponent_side} wins={opponent_wins ?? 0} turn={room?.turn === opponent_side} loading={!opponent_id} />

      <GameBoard
        board={room?.board || board_service.initial_board}
        on_cell_press={(cell) => room_id && room_service.make_move(room_id, cell).catch((err) => console.log(err))}
        last_move_cell={room?.last_move_cell ?? null}
      />

      <OnlineGamePlayer name="You" side={auth_user_side} wins={auth_user_wins ?? 0} turn={room?.turn === auth_user_side} />
      <KorButton onPress={on_home_press} style={{ marginTop: 20 }}>
        Leave
      </KorButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
