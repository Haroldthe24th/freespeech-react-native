import React, { useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Tile from "./Tile";
import { useSentenceBuilderStore } from "../utils/stores";
import { SpeechContext } from "../contexts/SpeechContext";

export const SentenceBuilderPressable = ({
  backgroundColor,
  text,
  icon,
  callback,
}: {
  backgroundColor: string;
  text: string;
  icon: string;
  callback: () => void;
}) => {
  const buttonStyles = [styles.button, { backgroundColor }];

  return (
    <TouchableOpacity onPress={callback} style={buttonStyles}>
      <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
        {text}
      </Text>
      <Icon name={icon} size={50} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const SentenceBuilder = () => {
  const { sentenceTiles, removeWord, clearSentence } = useSentenceBuilderStore(
    (state) => ({
      sentenceTiles: state.sentence,
      removeWord: state.removeWord,
      clearSentence: state.clearSentence,
    })
  );

  const { speakSentence } = useContext(SpeechContext);

  return (
    <View style={styles.sentenceBuilder}>
      <ScrollView
        horizontal={true}
        style={styles.sentenceBuilderTiles}
        showsHorizontalScrollIndicator={false} // optional: hide scrollbar
      >
        {sentenceTiles.map((item, index) => {
          return (
            <Tile
              image={item.image}
              text={item.text}
              noflex={true}
              callback={() => removeWord(index)}
              key={"phrase-tile-item-" + index}
            />
          );
        })}
      </ScrollView>
      <SentenceBuilderPressable
        backgroundColor="#ef4444"
        text="Clear"
        icon="trash-sharp"
        callback={clearSentence}
      />
      <SentenceBuilderPressable
        backgroundColor="#3b82f6"
        text="Speak"
        icon="volume-high-sharp"
        callback={speakSentence}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    gap: 5,
  },
  sentenceBuilder: {
    flexDirection: "row",
    height: 100,
    gap: 10,
    paddingHorizontal: 10,
  },
  sentenceBuilderTiles: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    overflow: "scroll",
  },
});

export default SentenceBuilder;
