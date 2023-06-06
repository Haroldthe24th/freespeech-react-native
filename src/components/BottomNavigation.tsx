import { View, Pressable, Text, StyleSheet } from "react-native";
import { surface } from "../utils/colors";
import { useAppModeStore, useProjectStore } from "../utils/stores";
import { AppMode } from "../utils/types";

const BottomNavigation = () => {
  const selectedBtn = [
    styles.navButton,
    { backgroundColor: surface.highlight },
  ];

  const resetBackToHome = useProjectStore((state) => state.resetBackToHome);
  const { appMode, setAppMode } = useAppModeStore();

  const buttons = [
    {
      text: "home",
      onPress: () => resetBackToHome(),
    },
    {
      text: "edit",
      onPress: () => null,
    },
    {
      text: "dashboard",
      onPress: () => null,
    },
  ];

  return (
    <View style={styles.bottomNavContainer}>
      {buttons.map((button) => (
        <Pressable
          key={button.text}
          style={button.text === appMode ? selectedBtn : styles.navButton}
          onPress={() => {
            button.onPress();
            setAppMode(button.text as AppMode);
          }}
        >
          <Text style={styles.navButtonText}>{button.text}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavContainer: {
    backgroundColor: surface.bg,
    flexDirection: "row",
    height: 50,
    padding: 5,
    gap: 5,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  navButtonText: {
    color: surface.text,
    fontSize: 20,
    textTransform: "capitalize",
  },
});

export default BottomNavigation;
