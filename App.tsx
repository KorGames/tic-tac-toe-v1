import { MainNav } from "navigation";
import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { Jost_400Regular, Jost_500Medium, useFonts, Jost_700Bold } from "@expo-google-fonts/jost";
import { AsyncPromptProvider } from "hooks/useAsyncPrompt";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import * as Sentry from "@sentry/react-native";
import { theme_tokens } from "utils/styles.utils";
import { AuthProvider } from "hooks/useAuth";
import "utils/sentry-config";
import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

function App() {
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
    <View style={{ flex: 1, backgroundColor: theme_tokens.dark.main }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <AuthProvider>
          <AsyncPromptProvider>
            <MainNav />
          </AsyncPromptProvider>
        </AuthProvider>
      </NavigationContainer>
    </View>
  );
}

export default Sentry.wrap(App);
