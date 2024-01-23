import { KorText } from "components/Library/KorText";
import React from "react";
import { StyleSheet, View } from "react-native";
import { theme_tokens } from "utils/styles.utils";

export const Logo = () => {
  return (
    <View style={styles.container}>
      <KorText style={styles.tic_text}>TIC</KorText>
      <KorText style={styles.tac_text}>TAC</KorText>
      <KorText style={styles.toe_text}>TOE</KorText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tic_text: {
    fontSize: 30,
    fontWeight: "bold",
    color: theme_tokens.primary.main,
    textShadowColor: theme_tokens.primary.dark,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  tac_text: {
    fontSize: 30,
    fontWeight: "bold",
    color: theme_tokens.tertiary.main,
    textShadowColor: theme_tokens.tertiary.dark,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  toe_text: {
    fontSize: 30,
    fontWeight: "bold",
    color: theme_tokens.secondary.main,
    textShadowColor: theme_tokens.secondary.dark,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
});
