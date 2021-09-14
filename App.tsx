import { NativeBaseProvider } from "native-base";
import { MainNav } from "navigation";
import React, { useEffect } from "react";
import { theme } from "style";
import * as Admob from "expo-ads-admob";

export default function App() {
  useEffect(() => {
    (async () => {
      try {
        const res = await Admob.getPermissionsAsync();
        console.log(res);
        if (!res.granted && res.canAskAgain) {
          await Admob.requestPermissionsAsync();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <MainNav />
    </NativeBaseProvider>
  );
}
