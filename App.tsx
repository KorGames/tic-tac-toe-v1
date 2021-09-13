import { NativeBaseProvider } from "native-base";
import { MainNav } from "navigation";
import React from "react";
import { theme } from "style";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <MainNav />
    </NativeBaseProvider>
  );
}
