import React, { useCallback, useMemo } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, PressableStateCallbackType, StyleProp, ViewStyle } from "react-native";
import { ICellValue } from "utils/interfaces";
import { theme_tokens } from "utils/styles.utils";

interface Props {
  on_cell_press: () => void;
  value: ICellValue;
}

export const GameBoardCell = ({ on_cell_press, value }: Props) => {
  const cell_icon = useMemo(() => {
    if (value === "X") {
      return <FontAwesome name="close" style={{ color: theme_tokens.primary.main, fontSize: 20 }} />;
    } else if (value === "O") {
      return <FontAwesome name="circle-o" style={{ color: theme_tokens.secondary.main, fontSize: 20 }} />;
    } else {
      return null;
    }
  }, [value]);

  const cell_style = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => ({
      width: 100,
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme_tokens.dark.light,
      borderRadius: 10,
      borderBottomColor: pressed ? theme_tokens.dark.light : theme_tokens.dark.dark,
      borderBottomWidth: 4,
    }),
    []
  );

  return (
    <Pressable onPress={on_cell_press} style={cell_style}>
      {cell_icon}
    </Pressable>
  );
};
