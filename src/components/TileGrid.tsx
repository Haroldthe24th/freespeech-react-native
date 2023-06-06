import { View, StyleSheet, Text } from "react-native";
import type { Tile as ITile } from "../utils/types";
import Tile from "./Tile";
import useTileMatrix from "../hooks/useTileMatrix"; // import the new custom hook
import { useAppModeStore, useProjectStore } from "../utils/stores";
import { tiles } from "../utils/colors";

const InvisibleTile = ({ x, y, subpageIndex }: ITile) => {
  return <View key={`${x}-${y}-${subpageIndex}`} style={{ flex: 1 }}></View>;
};

const AddTileButton = ({ x, y, subpageIndex }: ITile) => {
  return (
    <View
      key={`${x}-${y}-${subpageIndex}`}
      style={{ flex: 1, backgroundColor: "red" }}
    >
      <Text style={{ color: "white" }}>
        {x}, {y}
      </Text>
    </View>
  );
};

const TileGrid = () => {
  const appMode = useAppModeStore((state) => state.appMode);
  const project = useProjectStore((state) => state.project);
  const tileMatrix = useTileMatrix(project.columns, project.rows);

  return (
    <View style={styles.tileGrid}>
      {tileMatrix.map((row: ITile[], index: number) => {
        return (
          <View style={styles.tileRow} key={"tile-row-" + index}>
            {row.map((item: ITile, index: number) => {
              // If the item is flagged as invisible, that means there's a blank
              // spot in the grid.
              if (item.invisible) {
                if (appMode === "edit") {
                  return <AddTileButton {...item} />;
                } else {
                  return <InvisibleTile {...item} />;
                }
              }

              return (
                <Tile
                  {...item}
                  key={`${item.x}-${item.y}-${item.subpageIndex}`}
                />
              );
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
    backgroundColor: tiles.bg,
    padding: 10,
  },
});

export default TileGrid;
