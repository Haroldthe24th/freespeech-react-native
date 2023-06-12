// custom hook for generating tile matrix
import { useEffect, useState } from "react";
import type { Tile as ITile } from "../utils/types";
import { useProjectStore } from "../utils/stores";

//TODO: clean this up
Array.prototype.insert = function (index, ...items) {
  this.splice(index, 0, ...items);
};
const useTileMatrix = (gridCols: number, gridRows: number) => {
  const currentPage = useProjectStore((state) => state.currentPage);
  const [tileMatrix, setTileMatrix] = useState<any>([]);

  useEffect(() => {
    const tileMatrix = [...currentPage.tiles];
    let currentOffset = 0; //we are adding elements to this array, keep track of how many we add to use as an offset

    for (let j = 0; j < currentPage.tiles.length; j++) {
      try {
        //comparex j and j + 1 for empty spaces
        const x1 = currentPage.tiles[j].x;
        const y1 = currentPage.tiles[j].y;

        const x2 = currentPage.tiles[j + 1].x;
        const y2 = currentPage.tiles[j + 1].y;

        const disY = Math.abs(y2 - y1) * gridCols; //total number of tiles between the two rows
        const distX = Math.abs(x1 - gridCols) - Math.abs(x2 - gridCols); //offset x from each row
        const tileDistance = Math.abs(disY + distX); //add together for total distance of tiles

        if (tileDistance > 1) {
          let newArray = [];
          for (let i = 1; i < tileDistance; i++) {
            newArray.push({ invisible: true }); //we need a
          }
          tileMatrix.insert(j + 1 + currentOffset, ...newArray);
          currentOffset = newArray.length + currentOffset;
        }
      } catch (e) {}
    }
    //always append a few extra blank tiles at the end
    tileMatrix.push({ invisible: true });
    tileMatrix.push({ invisible: true });
    tileMatrix.push({ invisible: true });
    tileMatrix.push({ invisible: true });
    tileMatrix.push({ invisible: true });
    tileMatrix.push({ invisible: true });

    setTileMatrix(tileMatrix);
  }, [currentPage]);

  return tileMatrix;
};

export default useTileMatrix;
