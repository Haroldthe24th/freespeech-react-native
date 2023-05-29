import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Speech from "expo-speech";
import TileType from "./types";
import { Tile } from "./components";
import { SafeAreaView } from "react-native-safe-area-context";

const speechTiles = [
  {
    id: "0",
    text: "hello",
    img: "https://thumbs.dreamstime.com/b/bye-emoticon-happy-emoji-waving-goodbye-saying-gotta-go-see-you-179809104.jpg",
  },
  {
    id: "1",
    text: "world",
    img: "https://3.bp.blogspot.com/-LHluKlzxYOQ/VfMPTrUl9mI/AAAAAAAAAOo/13KjXN8wE1A/s1600/world.jpg",
  },
  {
    id: "2",
    text: "taco",
    img: "https://townsquare.media/site/29/files/2019/06/RS30972_ThinkstockPhotos-488498629-scr.jpg",
  },
  {
    id: "3",
    text: "eat",
    img: "https://toppng.com/uploads/preview/free-ready-to-eat-emoji-ready-to-eat-emoji-11563208911mwpatzpxke.png",
  },
];
export default function App() {
  const [sayList, setSayList] = useState<TileType[]>([]);
  const [sayExists, setSayExists] = useState<any>({}); //map of existing sayList items
  const addTileToPhrase = (newTileItem: TileType) => {
    speak(newTileItem.text);
    if (sayExists[newTileItem.id] === true) return; //item already exists don't add it
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor="white" />
        <View style={styles.headerContainer}>
          <View style={styles.imgContainer}>
            {sayList.map((item: TileType, index: number) => {
              return (
                <Tile
                  img={item.img}
                  text={item.text}
                  id={item.id}
                  callback={removeTileFromPhrase}
                  key={"phrase-tile-item-" + index}
                />
              );
            })}
          </View>
          <Button title="Speak Phrase" onPress={speakPhrase} />
        </View>
        <View style={styles.imgContainer}>
          {speechTiles.map((item: TileType, index: number) => {
            return (
              <Tile
                img={item.img}
                text={item.text}
                id={item.id}
                callback={addTileToPhrase}
                key={"tile-item-" + index}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  headerContainer: {
    width: "100%",
    marginBottom: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
});
