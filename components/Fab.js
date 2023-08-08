import { useReducer } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Motion } from "@legendapp/motion";
import { AntDesign } from "@expo/vector-icons";

const fabItemColors = [
  "#ffbdda",
  "#ffd493",
  "#ffffad",
  "#c1f0b2",
  "#9affff",
  "#a9bcff",
];

export function FabAction({ color, dispatch }) {
  return (
    <Pressable
      style={styles.fabContainer}
      onPress={() => {
        dispatch({ type: "added_note", color: color });
      }}
    >
      <Motion.View
        style={[styles.fabItem, { backgroundColor: color }]}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          default: {
            type: "spring",
            damping: 20,
            stiffness: 300,
          },
          opacity: {
            type: "tween",
            duration: 300,
          },
        }}
      ></Motion.View>
    </Pressable>
  );
}

export function Fab({ dispatch }) {
  const [isShownFab, setIsShownFab] = useReducer((hidden) => !hidden, false);

  return (
    <View style={styles.fabContainer}>
      <Pressable style={styles.addNoteButton} onPress={setIsShownFab}>
        <AntDesign
          style={styles.addNoteButtonIcon}
          name="pluscircle"
          size={32}
          color="slategray"
        />
      </Pressable>
      {isShownFab && (
        <Motion.View
          style={styles.fabItems}
          transition={{
            delayChildren: 0.3,
            staggerChildren: 0.2,
          }}
        >
          {fabItemColors.map((color) => {
            return <FabAction key={color} color={color} dispatch={dispatch} />;
          })}
        </Motion.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fabContainer: { alignItems: "center" },
  fabItem: { borderRadius: "50%", height: 25, width: 25 },
});
