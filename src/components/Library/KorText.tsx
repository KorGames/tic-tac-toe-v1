import React from "react";
import { TextProps, Text, StyleSheet } from "react-native";
import { theme_tokens } from "utils/styles.utils";

export interface IKorTextProps extends TextProps {
  weight?: "regular" | "bold";
  color?: "primary" | "secondary" | "tertiary" | "dark";
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
      fontSize: 16,
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
