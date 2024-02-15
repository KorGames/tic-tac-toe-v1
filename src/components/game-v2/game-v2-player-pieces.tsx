import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { IGameV2PlayerPiece } from "types/game-v2.types";
import { GameV2Piece } from "./game-v2-piece";

interface IProps {
  pieces: IGameV2PlayerPiece[];
  selected_piece: IGameV2PlayerPiece | null;
  on_piece_press: (piece: IGameV2PlayerPiece) => void;
}

export const GameV2PlayerPieces = ({ pieces, selected_piece, on_piece_press }: IProps) => {
  /* ******************** Hooks ******************** */
  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  const is_selected = (piece: IGameV2PlayerPiece) => selected_piece?.id === piece.id;

  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      {pieces.map((piece) => (
        <Pressable onPress={() => on_piece_press(piece)} key={piece.id}>
          <GameV2Piece piece={piece} size={50} is_selected={is_selected(piece)} is_active={piece.available} />
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
