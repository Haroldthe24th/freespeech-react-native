import { ReactElement, createContext } from "react";
import useSpeech from "../hooks/useSpeech";
import { useSentenceBuilderStore } from "../utils/stores";

export const SpeechContext = createContext<{
  speak: (text: string) => void;
  speakSentence: () => void;
}>({
  speak: () => null,
  speakSentence: () => null,
});

export const SpeechProvider = ({ children }: { children: ReactElement }) => {
  const sentence = useSentenceBuilderStore((state) => state.sentence);

  const speak = useSpeech();
  const speakSentence = () => {
    const sentenceText = sentence.map((item) => item.text).join(" ");
    speak(sentenceText);
  };

  return (
    <SpeechContext.Provider
      value={{
        speak,
        speakSentence,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};
