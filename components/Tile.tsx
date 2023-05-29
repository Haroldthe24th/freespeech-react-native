import React from "react";
import * as Speech from "expo-speech";

import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import TileType from "../types";

export default function Tile({
  text,
  img,
  id,
  callback,
}: TileType & { callback: Function }) {
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
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  text: { fontSize: 16, fontWeight: "bold" },
});
