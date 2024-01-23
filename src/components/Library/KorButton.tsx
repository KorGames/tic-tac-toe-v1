import { useCallback } from "react";
import { Pressable, PressableProps, PressableStateCallbackType, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { theme_tokens } from "utils/styles.utils";
import { KorText } from "./KorText";

export interface IKorButtonProps extends PressableProps {
  color?: "primary" | "secondary" | "tertiary";
}

export const KorButton = ({ children, color = "primary", ...props }: React.PropsWithChildren<IKorButtonProps>) => {
  const pressable_styles = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      return {
        backgroundColor: theme_tokens[color].main,
        padding: 5,
        borderRadius: 6,
        borderBottomWidth: 4,
        borderBottomColor: pressed ? theme_tokens[color].main : theme_tokens[color].dark,
        borderStyle: "solid",
        alignItems: "center",
      };
    },
    [color]
  );

  return (
    <Pressable {...props} style={pressable_styles}>
      <KorText style={{ color: theme_tokens.dark.main, textTransform: "uppercase" }}>{children}</KorText>
    </Pressable>
  );
};
