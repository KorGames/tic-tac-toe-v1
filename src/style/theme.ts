import { extendTheme } from "native-base";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#fef7e0",
      100: "#f3e6bc",
      200: "#e8d595",
      300: "#e0c46c",
      400: "#d7b344",
      500: "#bd992b",
      600: "#937720",
      700: "#695515",
      800: "#403309",
      900: "#181100",
    },
    secondary: {
      50: "#ffe5f0",
      100: "#fab9cf",
      200: "#f18daf",
      300: "#eb6190",
      400: "#e43670",
      500: "#ca1d56",
      600: "#9e1443",
      700: "#720d30",
      800: "#46051d",
      900: "#1d000b",
    },
    tertiary: {
      50: "#e2f5ff",
      100: "#b6dffc",
      200: "#89c9f7",
      300: "#5cb4f4",
      400: "#379ef1",
      500: "#2584d7",
      600: "#1b67a7",
      700: "#104a78",
      800: "#032c49",
      900: "#00101b",
    },
    light: {
      50: "#f7f3e8",
      100: "#e0dbcf",
      200: "#cac3b5",
      300: "#b4ac98",
      400: "#9e947c",
      500: "#857a62",
      600: "#685f4c",
      700: "#4a4435",
      800: "#2e291e",
      900: "#120e01",
    },
  },
  components: {
    Button: {
      baseStyle: {},
      defaultProps: {},
    },
    Icon: {
      baseStyle: {
        textAlign: "center",
        color: "white",
      },
    },
  },
});

export default theme;
