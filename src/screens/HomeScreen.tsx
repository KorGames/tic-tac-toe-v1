import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Logo } from "components/common/Logo";
import { KorButton } from "components/Library/KorButton";

export const HomeScreen = () => {
  const nav = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <KorButton onPress={() => nav.navigate("Game", { ai: true })}>Single Play</KorButton>
      <KorButton onPress={() => nav.navigate("Game")}>Two Players</KorButton>
      <KorButton onPress={() => nav.navigate("WaitingRoom")}>Online Play</KorButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    rowGap: 10,
  },
});
