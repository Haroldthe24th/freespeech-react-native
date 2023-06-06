import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { TileGrid, SentenceBuilder } from "./components";
import { SafeAreaView } from "react-native-safe-area-context";
import { SpeechProvider } from "./contexts/SpeechContext";

export default function App() {
  return (
    <SpeechProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <View style={styles.appContainer}>
          <SentenceBuilder />
          <TileGrid />
        </View>
      </SafeAreaView>
    </SpeechProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    gap: 10,
  },
});
