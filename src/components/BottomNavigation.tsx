import { View, Pressable, Text, StyleSheet } from "react-native";
import { surface } from "../utils/colors";
import { useProjectStore } from "../utils/stores";

const BottomNavigation = () => {
  const selectedBtn = [
    styles.navButton,
    { backgroundColor: surface.highlight },
  ];

  const resetBackToHome = useProjectStore((state) => state.resetBackToHome);

  const buttons = [
    {
      text: "Home",
      onPress: () => resetBackToHome(),
    },
    {
      text: "Edit",
      onPress: () => null,
    },
    {
      text: "Dashboard",
      onPress: () => null,
    },
  ];

  return (
    <View style={styles.bottomNavContainer}>
      {buttons.map((button) => (
        <Pressable
          key={button.text}
          style={button.text === "Home" ? selectedBtn : styles.navButton}
          onPress={button.onPress}
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
  },
});

export default BottomNavigation;
