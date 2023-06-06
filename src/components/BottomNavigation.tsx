import { View, Pressable, Text, StyleSheet } from "react-native";
import { surface } from "../utils/colors";

const BottomNavigation = () => {
  const selectedBtn = [
    styles.navButton,
    { backgroundColor: surface.highlight },
  ];

  return (
    <View style={styles.bottomNavContainer}>
      {["Home", "Edit", "Dashboard"].map((text) => (
        <Pressable
          key={text}
          style={text === "Home" ? selectedBtn : styles.navButton}
        >
          <Text style={styles.navButtonText}>{text}</Text>
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
  },
});

export default BottomNavigation;
