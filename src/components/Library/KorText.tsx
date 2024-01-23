import React from "react";
import { TextProps, Text, StyleSheet } from "react-native";

export interface IKorTextProps extends TextProps {
  weight?: "regular" | "bold";
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
