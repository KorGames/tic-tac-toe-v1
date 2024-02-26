import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Logo } from "components/common/Logo";
import { KorButton } from "components/Library/KorButton";
import { MainRouterScreenProps } from "types/navigation";
import { user_service } from "services/user.service";
import { useAsyncPrompt } from "hooks/useAsyncPrompt";
import { KorText } from "components/Library/KorText";
import { SafeAreaView } from "react-native-safe-area-context";
import { sign_out, useAuth } from "hooks/useAuth";

export const HomeScreen = () => {
  const navigation = useNavigation<MainRouterScreenProps<"OnlineGame">["navigation"]>();
  const { start_async_prompt, close_async_prompt } = useAsyncPrompt();
  const { user } = useAuth();

  const on_online_game_press = async () => {
    start_async_prompt({
      description: "Setting up online play...",
      hide_cancel: true,
      hide_confirm: true,
    });
    try {
      if (!user) await user_service.anonymous_user_login();
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

  /* ******************** Effects ******************** */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Logo />,
      headerLeft: () =>
        !user || user?.isAnonymous ? (
          <KorText onPress={() => navigation.navigate("SignIn")}>Log In</KorText>
        ) : (
          <KorText onPress={() => navigation.navigate("GameHistory")}>Game History</KorText>
        ),
      headerRight: () =>
        !user || user?.isAnonymous ? (
          <KorText onPress={() => navigation.navigate("SignUp")}>Sign Up</KorText>
        ) : (
          <KorText onPress={sign_out}>Log Out</KorText>
        ),
    });
  }, [user]);

  /* ******************** JSX ******************** */
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menu_container}>
        <KorText>Standard TIC TAC TOE</KorText>
        <KorButton onPress={() => navigation.navigate("Game", { ai: true })}>Single Play</KorButton>
        <KorButton onPress={() => navigation.navigate("Game")}>Two Players</KorButton>
        <KorButton onPress={on_online_game_press}>Online Play</KorButton>
        <View style={{ height: 20 }} />
        <KorText>New TIC TAC TOE V2</KorText>
        <KorButton onPress={() => navigation.navigate("GameV2")}>Two Players</KorButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  menu_container: {
    flex: 1,
    rowGap: 10,
    padding: 40,
    justifyContent: "center",
  },
});
