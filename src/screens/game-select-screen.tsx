import { useNavigation } from "@react-navigation/native";
import { Logo } from "components/common/Logo";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MainRouterScreenProps } from "types/navigation";

export const GameSelectScreen = () => {
  /* ******************** Hooks ******************** */
  const navigation = useNavigation<MainRouterScreenProps<"GameSelect">["navigation"]>();
  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo_container}>
        <Logo />
      </View>
      <View style={styles.menu_container}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo_container: {
    flex: 1,
    justifyContent: "center",
  },
  menu_container: {
    flex: 1,
    rowGap: 10,
  },
});
