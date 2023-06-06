import { View, StyleSheet } from "react-native";
import SentenceBuilder from "./SentenceBuilder";
import TileGrid from "./TileGrid";

const MainApplication = () => {
  return (
    <View style={styles.appContainer}>
      <SentenceBuilder />
      <TileGrid />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 25,
    gap: 10,
  },
});

export default MainApplication;
