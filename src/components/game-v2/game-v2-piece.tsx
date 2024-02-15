import { KorText } from "components/Library/KorText";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IGameV2PlayerPiece } from "types/game-v2.types";
import { theme_tokens } from "utils/styles.utils";

interface IProps {
  piece: IGameV2PlayerPiece;
  size: number;
  is_selected?: boolean;
  is_active?: boolean;
}

export const GameV2Piece = ({ piece, size, is_selected, is_active }: IProps) => {
  /* ******************** Hooks ******************** */
  /* ******************** Variables ******************** */
  const composed_styles = [
    styles.container,
    piece.side === "O" ? styles.red_container : styles.blue_container,
    is_selected && (piece.side === "O" ? styles.red_active_container : styles.blue_active_container),
    is_active ? styles.available_container : styles.disabled_container,
    { width: size, height: size },
  ];
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={composed_styles} pointerEvents="none">
      <KorText allowFontScaling adjustsFontSizeToFit minimumFontScale={0.1} style={styles.text}>
        {piece.value}
      </KorText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  red_container: {
    borderColor: theme_tokens.secondary.main,
  },
  blue_container: {
    borderColor: theme_tokens.primary.main,
  },
  red_active_container: {
    backgroundColor: theme_tokens.secondary.main,
  },
  blue_active_container: {
    backgroundColor: theme_tokens.primary.main,
  },
  selected_container: {
    borderColor: "yellow",
  },
  available_container: {
    opacity: 1,
  },
  disabled_container: {
    opacity: 0.5,
  },
});
