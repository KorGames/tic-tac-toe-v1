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
import { AntDesign } from "@expo/vector-icons";
import { SignInScreen } from "screens/sign-in-screen";
import { MainRouterParamList } from "types/navigation";
import { GameHistoryScreen } from "screens/game-history-screen";

const Stack = createNativeStackNavigator<MainRouterParamList>();

const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
        headerStyle: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
        contentStyle: {
          marginTop: StatusBar.currentHeight,
          backgroundColor: theme_tokens.dark.main,
        },
        headerBackTitleVisible: false,
        headerLeft: (props) => {
          return props.canGoBack ? <AntDesign onPress={navigation.goBack} name="arrowleft" size={24} color={theme_tokens.tertiary.main} /> : null;
        },
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="GameV2" component={GameV2Screen} />
      <Stack.Screen name="OnlineGame" component={OnlineGameScreen} />
      <Stack.Screen name="GameSelect" component={GameSelectScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="GameHistory" component={GameHistoryScreen} />
    </Stack.Navigator>
  );
};

export default Main;
