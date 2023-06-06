import { View, StyleSheet } from "react-native";
import SentenceBuilder from "./SentenceBuilder";
import TileGrid from "./TileGrid";
import { surface } from "../utils/colors";

const MainApplication = () => {
  return (
    <View style={styles.appContainer}>
      {/* <SentenceBuilder />
      <TileGrid /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    gap: 10,
    backgroundColor: surface.highlight,
  },
});

export default MainApplication;
