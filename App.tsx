import { MainNav } from "navigation";
import React, { useCallback } from "react";
import "utils/firebase.utils";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { Jost_400Regular, Jost_500Medium, useFonts, Jost_700Bold } from "@expo-google-fonts/jost";
import { AsyncPromptProvider } from "hooks/useAsyncPrompt";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";

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
    await requestTrackingPermissionsAsync();
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
        <MainNav />
      </AsyncPromptProvider>
    </View>
  );
}
