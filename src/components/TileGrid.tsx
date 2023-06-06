import { View, StyleSheet } from "react-native";
import type { Tile as ITile } from "../utils/types";
import Tile from "./Tile";
import useTileMatrix from "../hooks/useTileMatrix"; // import the new custom hook

const TileGrid = () => {
  const gridCols = 6;
  const gridRows = 4;

  const tileMatrix = useTileMatrix(gridCols, gridRows);

  return (
    <View style={styles.tileGrid}>
      {tileMatrix.map((row: ITile[], index: number) => {
        return (
          <View style={styles.tileRow} key={"tile-row-" + index}>
            {row.map((item: ITile, index: number) => {
              return <Tile {...item} key={"tile-item-" + index} />;
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tileRow: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  tileGrid: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
});

export default TileGrid;
