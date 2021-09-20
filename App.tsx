import { NativeBaseProvider } from "native-base";
import { MainNav } from "navigation";
import React, { useEffect } from "react";
import { theme } from "style";
import * as Admob from "expo-ads-admob";
import "utils/firebase";
import { Provider } from "react-redux";
import { store } from "store/store";

export default function App() {
  useEffect(() => {
    (async () => {
      try {
        const res = await Admob.getPermissionsAsync();
        // console.log(res);
        if (!res.granted && res.canAskAgain) {
          await Admob.requestPermissionsAsync();
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <MainNav />
      </NativeBaseProvider>
    </Provider>
  );
}
