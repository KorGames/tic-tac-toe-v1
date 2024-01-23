import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { StyleSheet, View } from "react-native";
import { IBoardValue, IPlayerSide } from "utils/interfaces";
import { MainRouterScreenProps } from "types/navigation";
import { board_service } from "services/board.service";
import { bot_service } from "services/bot.service";
import { GameBoard } from "components/Game/GameBoard";
import { ResultModal } from "components/Game/ResultModal";
import { GameAggregateResults } from "components/Game/GameAggregateResults";
import { GameControls } from "./GameControls";

export const GameScreen = () => {
  const navigation = useNavigation<MainRouterScreenProps<"Game">["navigation"]>();
  const route = useRoute<MainRouterScreenProps<"Game">["route"]>();

  const [board, _set_board] = useState<IBoardValue>(board_service.initial_board);
  const [turn, _set_turn] = useState<IPlayerSide>("X");
  const [x_wins, _set_x_wins] = useState<number>(0);
  const [o_wins, _set_o_wins] = useState<number>(0);
  const [draws, _set_draws] = useState<number>(0);

  /* ******************** Variables ******************** */
  const is_ai = route.params && route.params.ai;

  /* ******************** Functions ******************** */
  const on_board_reset = () => {
    _set_board(board_service.initial_board);
    _set_turn("X");
  };
  const process_end_result = (winner: IPlayerSide | null) => {
    if (winner === "X") {
      _set_x_wins(x_wins + 1);
    } else if (winner === "O") {
      _set_o_wins(o_wins + 1);
    } else {
      _set_draws(draws + 1);
    }
    on_board_reset();
  };

  const on_cell_press = (index: number) => {
    if (board[index]) {
      return;
    }

    _set_board((prevState) => board_service.update_board(prevState, index, turn));
  };

  /* ******************** Effects ******************** */
  // Switch turn
  useEffect(() => {
    if (board_service.is_board_empty(board)) {
      _set_turn("X");
    } else if (board_service.is_board_full(board)) {
      const winner = board_service.calculate_winner(board);
      process_end_result(winner);
    } else {
      const winner = board_service.calculate_winner(board);
      if (winner) {
        process_end_result(winner);
      } else {
        _set_turn(turn === "X" ? "O" : "X");
      }
    }
  }, [JSON.stringify(board)]);

  // Ai activated
  useEffect(() => {
    if (is_ai && turn === "O") {
      const ai_move = bot_service.calculate_next_move(board, turn);
      _set_board((prevState) => board_service.update_board(prevState, ai_move, turn));
    }
  }, [turn]);

  // useEffect(() => {
  //   if (!didMount.current) {
  //     didMount.current = true;
  //   } else {
  //     dispatch(showResultModal(true));
  //   }
  // }, [result]);

  // useFocusEffect(
  //   useCallback(() => {
  //     return () => {
  //       dispatch(resultReset());
  //       dispatch(boardReset());
  //     };
  //   }, [])
  // );

  return (
    <View style={styles.container}>
      <ResultModal />
      <GameAggregateResults x_wins={x_wins} o_wins={o_wins} draws={draws} />
      <GameBoard board={board} on_cell_press={on_cell_press} />
      <GameControls on_board_reset={on_board_reset} turn={turn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
  },
});
