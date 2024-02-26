import { useCallback } from "react";
import { Pressable, PressableProps, PressableStateCallbackType, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { theme_tokens } from "utils/styles.utils";
import { KorText } from "./KorText";

export interface IKorButtonProps extends PressableProps {
  color?: "primary" | "secondary" | "tertiary";
  left_icon?: React.ReactNode;
  right_icon?: React.ReactNode;
}

export const KorButton = ({ children, color = "primary", left_icon, right_icon, ...props }: React.PropsWithChildren<IKorButtonProps>) => {
  const pressable_styles = useCallback(
    ({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> => {
      return {
        backgroundColor: theme_tokens[color].main,
        padding: 5,
        borderRadius: 6,
        borderBottomWidth: 4,
        borderBottomColor: theme_tokens[color].dark,
        borderStyle: "solid",
        transform: [{ scale: pressed ? 0.95 : 1 }],
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 10,
      };
    },
    [color]
  );

  return (
    <Pressable {...props} style={pressable_styles}>
      {left_icon}
      <KorText weight="bold" size="lg" style={{ color: theme_tokens.dark.main, textTransform: "uppercase" }}>
        {children}
      </KorText>
      {right_icon}
    </Pressable>
  );
};
