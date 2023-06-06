import * as Speech from "expo-speech";
import { useState } from "react";

function useSpeech() {
  const [speaking, setSpeaking] = useState(false);

  const speak = (text: string) => {
    if (speaking) return;
    setSpeaking(true);
    Speech.stop();
    Speech.speak(text, {
      onDone: () => {
        setSpeaking(false);
      },
    });
  };

  return speak;
}

export default useSpeech;
