import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GameAggregateResults } from "components/Game/GameAggregateResults";
import { GameControls } from "components/Game/GameControls";
import { GameV2Board } from "components/game-v2/game-v2-board";
import { GameV2PlayerPieces } from "components/game-v2/game-v2-player-pieces";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { game_v2_board_service } from "services/game-v2-board.service";
import { game_v2_bot_service } from "services/game-v2-bot.service";
import { IGameV2BoardValue, IGameV2PlayerPiece, IGameV2PlayerSide, IGameV2Result } from "types/game-v2.types";
import { MainRouterScreenProps } from "types/navigation";

export const GameV2Screen = () => {
  /* ******************** Hooks ******************** */
  const [board, _set_board] = useState<IGameV2BoardValue>(game_v2_board_service.initial_board);
  const [turn, _set_turn] = useState<IGameV2PlayerSide>("X");
  const [winning_combination, _set_winning_combination] = useState<number[]>([]);
  const [pieces, _set_pieces] = useState<IGameV2PlayerPiece[]>([
    { id: 1, value: 1, available: true, side: "X" },
    { id: 2, value: 1, available: true, side: "X" },
    { id: 3, value: 2, available: true, side: "X" },
    { id: 4, value: 2, available: true, side: "X" },
    { id: 5, value: 3, available: true, side: "X" },
    { id: 6, value: 3, available: true, side: "X" },

    { id: 7, value: 1, available: true, side: "O" },
    { id: 8, value: 1, available: true, side: "O" },
    { id: 9, value: 2, available: true, side: "O" },
    { id: 10, value: 2, available: true, side: "O" },
    { id: 11, value: 3, available: true, side: "O" },
    { id: 12, value: 3, available: true, side: "O" },
  ]);

  const [x_wins, _set_x_wins] = useState<number>(0);
  const [o_wins, _set_o_wins] = useState<number>(0);
  const [draws, _set_draws] = useState<number>(0);

  const [selected_piece, _set_selected_piece] = useState<IGameV2PlayerPiece | null>(null);
  const navigation = useNavigation<MainRouterScreenProps<"GameV2">["navigation"]>();

  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  const on_piece_press = (piece: IGameV2PlayerPiece) => {
    if (piece.side !== turn) return;
    if (!piece.available) return;

    _set_selected_piece(piece);
  };

  const mark_piece_unavailable = (piece: IGameV2PlayerPiece) => {
    _set_pieces((prev) => {
      const index = prev.findIndex((x) => x.id === piece.id);
      if (index === -1) return prev;
      prev[index].available = false;
      return prev;
    });
  };

  const on_cell_press = useCallback(
    (cell_index: number, piece?: IGameV2PlayerPiece) => {
      let moving_piece = selected_piece;
      if (piece) moving_piece = piece;
      if (!moving_piece) return;
      const cell_piece = board[cell_index];
      if (cell_piece && cell_piece?.value >= moving_piece.value) return;

      _set_board((prev) => game_v2_board_service.update_board(prev, cell_index, moving_piece!));
      mark_piece_unavailable(moving_piece);
      _set_selected_piece(null);
      _set_turn((prev) => (prev === "X" ? "O" : "X"));
    },
    [selected_piece]
  );

  const on_reset = () => {
    _set_board(game_v2_board_service.initial_board);
    _set_turn("X");
    _set_winning_combination([]);
    _set_pieces((prev) => prev.map((x) => ({ ...x, available: true })));
    _set_o_wins(0);
    _set_x_wins(0);
    _set_draws(0);
  };

  const on_new_round = () => {
    _set_board(game_v2_board_service.initial_board);
    _set_winning_combination([]);
    _set_pieces((prev) => prev.map((x) => ({ ...x, available: true })));
  };

  const on_home_press = () => {
    navigation.navigate("Home");
  };

  /* ******************** Effects ******************** */
  useFocusEffect(
    useCallback(() => {
      const draw = game_v2_board_service.check_draw(pieces, board, turn);
      const win = game_v2_board_service.check_win(board);
 
      if (draw) {
        _set_draws(draws + 1);
        on_new_round();
      } else if (win) {
        if (win.side === "X") _set_x_wins(x_wins + 1);
        else _set_o_wins(o_wins + 1);
        _set_winning_combination(win.winning_combination);
        on_new_round();
      }
    }, [JSON.stringify(board)])
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     if (turn === "red" && !result) {
  //       if (game_v2_board_service.get_available_moves(board).length > 6) {
  //         const { cellId, piece } = game_v2_bot_service.calculate_next_move_easy("red", pieces, board);
  //         on_cell_press(cellId, piece);
  //       } else {
  //         const { cellId, piece } = game_v2_bot_service.calculate_next_move_hard("red", pieces, board);
  //         on_cell_press(cellId, piece);
  //       }
  //     }
  //   }, [turn, result])
  // );

  /* ******************** JSX ******************** */
  return (
    <SafeAreaView style={styles.container}>
      <GameAggregateResults x_wins={x_wins} o_wins={o_wins} draws={draws} />
      <GameV2PlayerPieces on_piece_press={on_piece_press} pieces={pieces.filter((x) => x.side === "X")} selected_piece={selected_piece} />
      <GameV2Board board={board} on_cell_press={on_cell_press} />
      <GameV2PlayerPieces on_piece_press={on_piece_press} pieces={pieces.filter((x) => x.side === "O")} selected_piece={selected_piece} />
      <GameControls on_reset={on_reset} turn={turn} on_home_press={on_home_press} />
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
