import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StatusBar } from "react-native";
import { GameScreen } from "screens/GameScreen";
import { HomeScreen } from "screens/HomeScreen";
import { OnlineGameScreen } from "screens/OnlineGameScreen";
import { WaitingRoomScreen } from "screens/WaitingRoomScreen";
import { theme_tokens } from "utils/styles.utils";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            marginTop: StatusBar.currentHeight,
            backgroundColor: theme_tokens.dark.main,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="WaitingRoom" component={WaitingRoomScreen} />
        <Stack.Screen name="OnlineGame" component={OnlineGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
