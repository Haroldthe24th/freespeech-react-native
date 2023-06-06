// custom hook for generating tile matrix
import { useEffect, useState } from "react";
import type { Tile as ITile } from "../utils/types";
import { useProjectStore } from "../utils/stores";

const useTileMatrix = (gridCols: number, gridRows: number) => {
  const currentPage = useProjectStore((state) => state.currentPage);
  const [tileMatrix, setTileMatrix] = useState<ITile[][]>([]);

  useEffect(() => {
    let tilesWithBlanks: ITile[] = [...currentPage.tiles];

    const totalGridTiles = gridCols * gridRows;
    const blankTileCount = totalGridTiles - tilesWithBlanks.length;

    for (let i = 0; i < blankTileCount; i++) {
      tilesWithBlanks.push({
        x: i % gridCols,
        y: Math.floor(i / gridCols),
        text: "",
        invisible: true,
      });
    }

    const matrix = tilesWithBlanks.reduce(
      (resultArray: ITile[][], item, index) => {
        const chunkIndex = Math.floor(index / gridCols);
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
      },
      []
    );

    setTileMatrix(matrix);
  }, [currentPage]);

  return tileMatrix;
};

export default useTileMatrix;
