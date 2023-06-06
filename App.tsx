import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import english from "./layouts/english";
import * as Speech from "expo-speech";
import TileType from "./types";
import { Tile } from "./components";
import type { Tile as ITile } from "./types";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export default function App() {
  const [sayList, setSayList] = useState<TileType[]>([]);
  const [sayExists, setSayExists] = useState<any>({}); //map of existing sayList items

  const addTileToPhrase = (newTileItem: TileType) => {
    speak(newTileItem.text);
    //if (sayExists[newTileItem.id] === true) return; //item already exists don't add it
    //first say this tile
    const newSayList = [...sayList];
    newSayList.push(newTileItem);
    console.log("sayList", sayList);
    setSayList(newSayList);
    //update sayExists
    const newSayExists = { ...sayExists };
    newSayExists[newTileItem.id] = true;
    setSayExists(newSayExists);
  };
  const removeTileFromPhrase = (newTileItem: TileType) => {
    //filter out tileId
    const newSayList = [...sayList].filter((item: TileType) => {
      if (item.id === newTileItem.id) return false;
      return true;
    });
    setSayList(newSayList);
    //update sayExists removing relevent entry
    const newSayExists = { ...sayExists };
    delete newSayExists[newTileItem.id];
    setSayExists(newSayExists);
  };
  const speak = (text: string) => {
    //https://docs.expo.dev/versions/latest/sdk/speech/?utm_source=google&utm_medium=cpc&utm_content=performancemax&gclid=Cj0KCQjwmtGjBhDhARIsAEqfDEeKr3hkhwEvjNgRHB8Og6xeeDyWtDRmycjii6MI-5evyTyXzq7CWzsaAuPGEALw_wcB
    Speech.stop();
    Speech.speak(text);
  };
  const speakPhrase = () => {
    let sayString = "";
    sayList.forEach((item: TileType) => {
      sayString = sayString + " " + item.text;
    });
    speak(sayString);
  };
  const clearSentence = () => {
    setSayList([]);
    setSayExists({});
  };

  const gridCols = 6;

  const homePage = english.pages.find((page) => page.name === "home");
  if (!homePage) return <Text>Page not found</Text>;
  const tileMatrix = homePage.tiles.reduce(
    (resultArray: ITile[][], item, index) => {
      const chunkIndex = Math.floor(index / gridCols);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }
      resultArray[chunkIndex].push(item);
      return resultArray;
    },
    []
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View style={styles.appContainer}>
        <View style={styles.sentenceBuilder}>
          <ScrollView
            horizontal={true}
            style={styles.sentenceBuilderTiles}
            showsHorizontalScrollIndicator={false} // optional: hide scrollbar
          >
            {sayList.map((item: TileType, index: number) => {
              return (
                <Tile
                  img={item.img}
                  text={item.text}
                  id={item.id}
                  noflex={true}
                  callback={removeTileFromPhrase}
                  key={"phrase-tile-item-" + index}
                />
              );
            })}
          </ScrollView>
          <Pressable style={styles.trashButton} onPress={clearSentence}>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
              Clear
            </Text>
            <Icon name="trash-sharp" size={50} color="#FFFFFF" />
          </Pressable>
          <Pressable style={styles.speakButton} onPress={speakPhrase}>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
              Speak
            </Text>
            <Icon name="volume-high-sharp" size={50} color="#FFFFFF" />
          </Pressable>
        </View>
        <View style={styles.tileGrid}>
          {tileMatrix.map((row: ITile[], index: number) => {
            return (
              <View style={styles.tileRow} key={"tile-row-" + index}>
                {row.map((item: ITile, index: number) => {
                  return (
                    <Tile
                      img={item.image + ""}
                      text={item.text}
                      id={`${item.x}${item.y}${item.subpageIndex}`}
                      callback={addTileToPhrase}
                      key={"tile-item-" + index}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tileRow: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  sentenceBuilderTiles: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    overflow: "scroll",
  },
  appContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    gap: 10,
  },
  sentenceBuilder: {
    flexDirection: "row",
    height: 125,
    gap: 10,
  },
  speakButton: {
    width: 125,
    height: 125,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    gap: 5,
  },
  trashButton: {
    width: 125,
    height: 125,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    gap: 5,
  },
  tileGrid: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
});
