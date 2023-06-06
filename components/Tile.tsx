import React from "react";
import * as Speech from "expo-speech";

import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import TileType from "../types";

export default function Tile({
  text,
  img,
  id,
  noflex,
  callback,
}: TileType & { callback: Function; noflex?: boolean }) {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 10,
      padding: 10,
      flex: noflex ? 0 : 1,
      marginRight: noflex ? 10 : 0,
    },
    image: {
      borderRadius: 10,
      width: 100,
      maxHeight: 100,
      flex: 1,
    },
    text: { fontSize: 16, fontWeight: "bold" },
  });

  const callCallback = () => {
    callback({ text, img, id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={callCallback}>
      <Text style={styles.text}>{text}</Text>
      <Image style={styles.image} source={{ uri: img }} resizeMode="contain" />
    </TouchableOpacity>
  );
}
