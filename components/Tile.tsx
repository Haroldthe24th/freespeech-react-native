import React, { useContext } from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Tile as ITile } from "../types";
import { SpeechContext } from "../contexts/SpeechContext";
import { useProjectStore, useSentenceBuilderStore } from "../stores";

export default function Tile({
  text,
  image,
  folder,
  noflex,
  callback,
}: ITile & { callback?: Function; noflex?: boolean }) {
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
    console.log(folder);
    speak(text);
    addWord({ text, image });
  };

  return (
    <TouchableOpacity style={tileStyles} onPress={handlePress}>
      <Text style={styles.text}>{text}</Text>
      <Image
        style={styles.image}
        source={{ uri: image }}
        resizeMode="contain"
      />
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
    padding: 10,
  },
  containerFlex: {
    flex: 1,
    marginRight: 0,
  },
  containerNoFlex: {
    flex: 0,
    marginRight: 10,
  },
  image: {
    borderRadius: 10,
    width: 100,
    maxHeight: 100,
    flex: 1,
  },
  text: { fontSize: 16, fontWeight: "bold" },
});
