import { View, StyleSheet, Text, ScrollView } from "react-native";
import type { Tile as ITile } from "../utils/types";
import { Tile, InvisibleTile, AddTileButton } from "./Tile";
import useTileMatrix from "../hooks/useTileMatrix"; // import the new custom hook
import { useAppModeStore, useProjectStore } from "../utils/stores";
import { tiles } from "../utils/colors";
const TileGrid = () => {
  const appMode = useAppModeStore((state) => state.appMode);
  const project = useProjectStore((state) => state.project);
  const tileMatrix = useTileMatrix(project.columns, project.rows);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: tiles.bg }}>
      <View style={styles.tileRow}>
        {tileMatrix.map((item: ITile, index: number) => {
          // If the item is flagged as invisible, that means there's a blank
          // spot in the grid.
          if (item.invisible) {
            if (appMode === "edit") {
              return <AddTileButton {...item} key={"add-tile-" + index} />;
            } else {
              return <InvisibleTile {...item} key={"blank-tile-" + index} />;
            }
          }

          return (
            <Tile {...item} key={`${item.x}-${item.y}-${item.subpageIndex}`} />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tileRow: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tileGrid: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
});

export default TileGrid;
