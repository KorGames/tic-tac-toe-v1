import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { StyleSheet } from "react-native";
import { IBoardValue, IPlayerSide } from "utils/interfaces";
import { MainRouterScreenProps } from "types/navigation";
import { board_service } from "services/board.service";
import { bot_service } from "services/bot.service";
import { GameBoard } from "components/Game/GameBoard";
import { GameAggregateResults } from "components/Game/GameAggregateResults";
import { GameControls } from "../components/Game/GameControls";
import { useAsyncPrompt } from "hooks/useAsyncPrompt";
import { KorText } from "components/Library/KorText";
import { SafeAreaView } from "react-native-safe-area-context";

export const GameScreen = () => {
  const navigation = useNavigation<MainRouterScreenProps<"Game">["navigation"]>();
  const route = useRoute<MainRouterScreenProps<"Game">["route"]>();

  const [board, _set_board] = useState<IBoardValue>(board_service.initial_board);
  const [turn, _set_turn] = useState<IPlayerSide>("X");
  const [x_wins, _set_x_wins] = useState<number>(0);
  const [o_wins, _set_o_wins] = useState<number>(0);
  const [draws, _set_draws] = useState<number>(0);
  const { start_async_prompt, close_async_prompt } = useAsyncPrompt();
  const [last_move, _set_last_move] = useState<number | null>(null);

  /* ******************** Variables ******************** */
  const is_ai = route.params && route.params.ai;

  /* ******************** Functions ******************** */
  const on_home_press = () => {
    navigation.navigate("Home");
  };

  const on_board_reset = () => {
    _set_board(board_service.initial_board);
    _set_turn("X");
    _set_last_move(null);
  };

  const on_game_reset = () => {
    _set_x_wins(0);
    _set_o_wins(0);
    _set_draws(0);
    on_board_reset();
  };

  const process_end_result = (winner: IPlayerSide | "draw") => {
    if (winner === "X") {
      _set_x_wins(x_wins + 1);
      start_async_prompt({
        title: (
          <KorText color="primary" weight="bold">
            X WINS!
          </KorText>
        ),
        hide_cancel: true,
        hide_confirm: true,
      });
    } else if (winner === "O") {
      _set_o_wins(o_wins + 1);
      start_async_prompt({
        title: (
          <KorText color="secondary" weight="bold">
            O WINS!
          </KorText>
        ),
        hide_cancel: true,
        hide_confirm: true,
      });
    } else {
      _set_draws(draws + 1);
      start_async_prompt({
        title: (
          <KorText color="tertiary" weight="bold">
            DRAW
          </KorText>
        ),
        hide_cancel: true,
        hide_confirm: true,
      });
    }
    on_board_reset();
    setTimeout(() => {
      close_async_prompt();
    }, 1500);
  };

  const on_cell_press = (index: number) => {
    if (board[index]) {
      return;
    }
    _set_last_move(index);
    _set_board((prevState) => board_service.update_board(prevState, index, turn));
  };

  /* ******************** Effects ******************** */
  // Switch turn
  useEffect(() => {
    if (board_service.is_board_empty(board)) {
      _set_turn("X");
    }
    const winner = board_service.calculate_winner(board);
    if (winner) {
      process_end_result(winner);
    } else {
      _set_turn(turn === "X" ? "O" : "X");
    }
  }, [JSON.stringify(board)]);

  // Ai activated
  useEffect(() => {
    if (is_ai && turn === "O") {
      const ai_move = bot_service.calculate_next_move(board, turn);
      _set_board((prevState) => board_service.update_board(prevState, ai_move, turn));
    }
  }, [turn]);

  return (
    <SafeAreaView style={styles.container}>
      <GameAggregateResults x_wins={x_wins} o_wins={o_wins} draws={draws} />
      <GameBoard board={board} on_cell_press={on_cell_press} last_move_cell={last_move} />
      <GameControls on_reset={on_game_reset} turn={turn} on_home_press={on_home_press} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    rowGap: 20,
    padding: 20,
  },
});
