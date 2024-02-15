import React, { useCallback, useMemo } from "react";
import { Pressable, PressableStateCallbackType, StyleProp, ViewStyle } from "react-native";
import { theme_tokens } from "utils/styles.utils";
import { KorText } from "components/Library/KorText";
import { ICellValue } from "types/game.types";

interface Props {
  on_cell_press: () => void;
  value: ICellValue;
  size: number;
  highlighted?: boolean;
}

export const GameBoardCell = ({ on_cell_press, value, size, highlighted }: Props) => {
  const cell_icon = useMemo(() => {
    if (value === "X") {
      return (
        <KorText weight="bold" style={{ color: theme_tokens.primary.main, fontSize: size / 2 }}>
          X
        </KorText>
      );
    } else if (value === "O") {
      return (
        <KorText weight="bold" style={{ color: theme_tokens.secondary.main, fontSize: size / 2 }}>
          O
        </KorText>
      );
    } else {
      return null;
    }
  }, [value]);

  const cell_style = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => ({
      width: size,
      height: size,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme_tokens.dark.light,
      borderRadius: 10,

      borderWidth: 1,
      borderColor: highlighted ? theme_tokens.tertiary.main : theme_tokens.dark.light,

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
    [size, highlighted]
  );

  return (
    <Pressable onPress={on_cell_press} style={cell_style}>
      {cell_icon}
    </Pressable>
  );
};
