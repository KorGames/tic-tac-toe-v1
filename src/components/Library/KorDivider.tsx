import React from "react";
import { StyleSheet, View } from "react-native";
import { theme_tokens } from "utils/styles.utils";

export const KorDivider = () => {
  /* ******************** Hooks ******************** */
  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: theme_tokens.tertiary.main,
    flex: 1,
  },
});
