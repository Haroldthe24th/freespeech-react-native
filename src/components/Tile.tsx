import React, { useContext, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { Tile as ITile } from "../utils/types";
import { SpeechContext } from "../contexts/SpeechContext";
import { useProjectStore, useSentenceBuilderStore } from "../utils/stores";
import { tile } from "../utils/colors";
import { Entypo } from "@expo/vector-icons";
import { Dimensions } from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("window");
export const Tile = ({
  text,
  image,
  folder,
  noflex,
  callback,
}: ITile & { callback?: Function; noflex?: boolean }) => {
  const tileStyles = [
    styles.container,
    noflex ? styles.containerNoFlex : styles.containerFlex,
  ];

  const { speak } = useContext(SpeechContext);
  const addWord = useSentenceBuilderStore((state) => state.addWord);
  const setCurrentPage = useProjectStore((state) => state.setCurrentPage);

  const handlePress = () => {
    if (callback) return callback();
    if (folder) return setCurrentPage(folder);
    speak(text);
    addWord({ text, image });
  };

  return (
    <TouchableOpacity style={tileStyles} onPress={handlePress}>
      <Text style={styles.text}>{text}</Text>
      {image && (
        <Image
          style={styles.image}
          source={{ uri: image }}
          resizeMode="contain"
        />
      )}

      {folder && (
        <Entypo
          name="folder"
          size={24}
          color="black"
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            backgroundColor: "#fff",
            borderRadius: 100,
            padding: 5,
          }}
        />
      )}
    </TouchableOpacity>
  );
};
export const InvisibleTile = ({ x, y, subpageIndex }: ITile) => {
  return (
    <View
      key={`${x}-${y}-${subpageIndex}`}
      style={{
        ...styles.containerFlex,
        backgroundColor: "oragnge",
        height: 150,
      }}
    ></View>
  );
};
export const AddTileButton = ({}: ITile) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.containerFlex,
        height: 150,
        borderColor: tile.border,
        borderWidth: 2,
        borderRadius: 10,
        borderStyle: "dashed",
        alignItems:'center',
        justifyContent:'center'
      }}
    >
      <Entypo name="plus" size={60} color="black" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: tile.bg,
    borderColor: tile.border,
  },
  containerFlex: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5,
    width: width / 6 - 10, //offset marginRight + marginLeft, the 6 is our columnNumber TODO: make it a global variable
  },
  containerNoFlex: {
    flex: 0,
    marginRight: 10,
    minWidth: 200,
  },
  image: {
    borderRadius: 10,
    width: 100,
    height: 100,
    flex: 1,
  },
  text: { fontSize: 16, color: tile.text, fontWeight: 500, marginBottom: 5 },
});
