import { MainNav } from "navigation";
import React, { useCallback } from "react";
import "utils/firebase.utils";
import { Provider } from "react-redux";
import { store } from "store/store";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { Jost_400Regular, Jost_500Medium, useFonts, Jost_700Bold } from "@expo-google-fonts/jost";
import { AsyncPromptProvider } from "hooks/useAsyncPrompt";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    jost_regular: Jost_400Regular,
    jost_medium: Jost_500Medium,
    jost_bold: Jost_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AsyncPromptProvider>
        <Provider store={store}>
          <MainNav />
        </Provider>
      </AsyncPromptProvider>
    </View>
  );
}
