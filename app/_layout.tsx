import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import "../global.css";

const myTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'red',
    card: "#101010"
  }
};

export default function RootLayout() {
  return(
    <ThemeProvider value={myTheme}>
    <Slot />
    </ThemeProvider>
  )
}
 