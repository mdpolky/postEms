import { useReducer } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
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

export function FabAction({ color, dispatch, hideFabFn }) {
  const addNote = () => {
    hideFabFn();
    dispatch({ type: "added_note", color: color });
  };
  return (
    <Pressable style={styles.fabActionPressable} onPress={addNote}>
      <Motion.View
        style={[styles.fabAction, { backgroundColor: color }]}
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
          size={50}
          color="#708090"
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
            return (
              <FabAction
                key={color}
                color={color}
                dispatch={dispatch}
                hideFabFn={setIsShownFab}
              />
            );
          })}
        </Motion.View>
      )}
    </View>
  );
}

const baseStyles = StyleSheet.create({
  fabContainer: { alignItems: "center" },
  addNoteButton: { marginBottom: 10 },
  fabItems: { gap: 20 },
  fabActionPressable: { alignItems: "center" },
  fabAction: { borderRadius: "50%", height: 25, width: 25 },
});

const iosStyles = StyleSheet.create({
  fabContainer: {
    flexDirection: "row-reverse",
  },
  addNoteButton: { marginLeft: 20, marginRight: 20 },
  fabItems: { flexDirection: "row-reverse", gap: 20, alignItems: "center" },
  fabActionPressable: {},
  fabAction: { borderRadius: "50%", height: 25, width: 25 },
});

const styles = Platform.OS === "ios" ? iosStyles : baseStyles;
