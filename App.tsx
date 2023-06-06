import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { MainApplication, Dashboard, BottomNavigation } from "./src/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { SpeechProvider } from "./src/contexts/SpeechContext";
import { useAppModeStore } from "./src/utils/stores";

export default function App() {
  const appMode = useAppModeStore((state) => state.appMode);
  return (
    <SpeechProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        {appMode === "dashboard" ? <Dashboard /> : <MainApplication />}
        <BottomNavigation />
      </SafeAreaView>
    </SpeechProvider>
  );
}
