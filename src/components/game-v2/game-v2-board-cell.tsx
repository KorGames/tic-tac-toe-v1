import React, { useCallback } from "react";
import { PressableStateCallbackType, StyleProp, ViewStyle, Pressable } from "react-native";
import { IGameV2CellValue } from "types/game-v2.types";
import { theme_tokens } from "utils/styles.utils";
import { GameV2Piece } from "./game-v2-piece";

interface IProps {
  value: IGameV2CellValue;
  on_cell_press: () => void;
  size: number;
}

export const GameV2BoardCell = ({ value, on_cell_press, size }: IProps) => {
  const cell_style = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => ({
      width: size,
      height: size,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme_tokens.dark.light,
      borderRadius: 10,

      borderWidth: 1,
      // borderColor: highlighted ? theme_tokens.tertiary.main : theme_tokens.dark.light,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      transform: [{ scale: pressed ? 0.95 : 1 }],
    }),
    [size]
  );

  return (
    <Pressable onPress={on_cell_press} style={cell_style}>
      {value && <GameV2Piece piece={value} size={50} is_selected is_active />}
    </Pressable>
  );
};
