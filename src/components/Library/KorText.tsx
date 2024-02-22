import React from "react";
import { TextProps, Text, StyleSheet } from "react-native";
import { font_size_tokens, theme_tokens } from "utils/styles.utils";

export interface IKorTextProps extends TextProps {
  weight?: "regular" | "bold";
  color?: "primary" | "secondary" | "tertiary" | "dark";
  size?: keyof typeof font_size_tokens;
}

const font_weight_map = {
  regular: "jost_regular",
  bold: "jost_bold",
};

export const KorText = (props: React.PropsWithChildren<IKorTextProps>) => {
  /* ******************** Hooks ******************** */
  /* ******************** Variables ******************** */
  const styles = StyleSheet.create({
    container: {
      fontSize: font_size_tokens[props.size || "md"],
      fontFamily: font_weight_map[props.weight || "regular"],
      color: theme_tokens[props.color || "tertiary"].main,
      includeFontPadding: false,
      textAlignVertical: "center",
      textAlign: "center",
    },
  });

  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return <Text {...props} style={[styles.container, props.style]} />;
};
