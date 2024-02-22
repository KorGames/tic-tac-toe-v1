import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StatusBar } from "react-native";
import { GameScreen } from "screens/GameScreen";
import { HomeScreen } from "screens/HomeScreen";
import { OnlineGameScreen } from "screens/OnlineGameScreen";
import { GameSelectScreen } from "screens/game-select-screen";
import { GameV2Screen } from "screens/game-v2.screen";
import { SignUpScreen } from "screens/sign-up-screen";
import { theme_tokens } from "utils/styles.utils";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
        contentStyle: {
          marginTop: StatusBar.currentHeight,
          backgroundColor: theme_tokens.dark.main,
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="GameV2" component={GameV2Screen} />
      <Stack.Screen name="OnlineGame" component={OnlineGameScreen} />
      <Stack.Screen name="GameSelect" component={GameSelectScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      {/* <Stack.Screen name="LogIn" component={GameSelectScreen} /> */}
    </Stack.Navigator>
  );
};

export default Main;
