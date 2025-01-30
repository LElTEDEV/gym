import { StatusBar, View } from "react-native";

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "./config/gluestack-ui.config";

import { Loading } from "@/components/Loading";
import { Routes } from "@/routes";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <GluestackUIProvider config={config}>
      {fontsLoaded ? <Routes /> : <Loading />}

      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
    </GluestackUIProvider>
  );
}
