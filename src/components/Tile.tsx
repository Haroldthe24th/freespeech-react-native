import React, { useContext, useState } from "react";
import { Text, StyleSheet, Pressable, Image } from "react-native";
import { Tile as ITile } from "../utils/types";
import { SpeechContext } from "../contexts/SpeechContext";
import { useProjectStore, useSentenceBuilderStore } from "../utils/stores";
import { tile } from "../utils/colors";

export default function Tile({
  text,
  image,
  folder,
  noflex,
  callback,
}: ITile & { callback?: Function; noflex?: boolean }) {
  const [opacity, setOpacity] = useState(1);

  const tileStyles = [
    styles.container,
    noflex ? styles.containerNoFlex : styles.containerFlex,
    { opacity },
  ];

  const { speak } = useContext(SpeechContext);
  const addWord = useSentenceBuilderStore((state) => state.addWord);
  const setCurrentPage = useProjectStore((state) => state.setCurrentPage);

  const handlePressIn = () => {
    setOpacity(0.5);
  };

  const handlePressOut = () => {
    setOpacity(1);
    if (callback) return callback();
    if (folder) return setCurrentPage(folder);
    speak(text);
    addWord({ text, image });
  };

  return (
    <Pressable
      style={tileStyles}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text style={styles.text}>{text}</Text>
      {image && (
        <Image
          style={styles.image}
          source={{ uri: image }}
          resizeMode="contain"
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: tile.bg,
    borderColor: tile.border,
  },
  containerFlex: {
    flex: 1,
    marginRight: 0,
  },
  containerNoFlex: {
    flex: 0,
    marginRight: 10,
    minWidth: 100,
  },
  image: {
    borderRadius: 10,
    width: 100,
    maxHeight: 100,
    flex: 1,
  },
  text: { fontSize: 16, color: tile.text },
});
