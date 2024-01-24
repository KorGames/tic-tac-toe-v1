import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Logo } from "components/common/Logo";
import { KorButton } from "components/Library/KorButton";
import { MainRouterScreenProps } from "types/navigation";
import { user_service } from "services/user.service";
import { useAsyncPrompt } from "hooks/useAsyncPrompt";
import { firebase_auth } from "utils/firebase.utils";

export const HomeScreen = () => {
  const navigation = useNavigation<MainRouterScreenProps<"OnlineGame">["navigation"]>();
  const { start_async_prompt, close_async_prompt } = useAsyncPrompt();

  const on_online_game_press = async () => {
    start_async_prompt({
      description: "Setting up online play...",
      hide_cancel: true,
      hide_confirm: true,
    });
    try {
      if (!firebase_auth.currentUser) await user_service.anonymous_user_login();
      close_async_prompt();
      navigation.navigate("OnlineGame");
    } catch (error) {
      console.log(error);
      start_async_prompt({
        title: "Error",
        description: "Failed to set up online play.",
        hide_cancel: true,
        confirm_text: "OK",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo_container}>
        <Logo />
      </View>
      <View style={styles.menu_container}>
        <KorButton onPress={() => navigation.navigate("Game", { ai: true })}>Single Play</KorButton>
        <KorButton onPress={() => navigation.navigate("Game")}>Two Players</KorButton>
        <KorButton onPress={on_online_game_press}>Online Play</KorButton>
      </View>
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
    padding: 20,
    justifyContent: "center",
  },
});
