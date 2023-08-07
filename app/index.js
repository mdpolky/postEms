import { StatusBar } from "expo-status-bar";
import { useReducer, useState } from "react";
import {
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, Motion } from "@legendapp/motion";

function Note({ data, dispatch }) {
  const [noteText, onChangeNoteText] = useState(data.text);
  const [noteDate, setNoteDate] = useState(data.date); //TODO: onChangeNoteText should change NoteDate as well
  const [isEditable, setIsEditable] = useReducer(
    (editable) => !editable,
    false
  );
  const noteContainerStyle = data.color
    ? [styles.noteContainer, { backgroundColor: data.color }]
    : styles.noteContainer;
  return (
    <Motion.View
      key={data.id}
      style={noteContainerStyle}
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
      layout={{ duration: 2.0 }}
    >
      {isEditable ? (
        <TextInput
          style={[styles.noteText, styles.noteTextInput]}
          multiline={true}
          onChangeText={onChangeNoteText}
          value={noteText}
        >
          {noteText}
        </TextInput>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.noteText}>{noteText}</Text>
        </ScrollView>
      )}

      <View style={styles.noteFooter}>
        <Text style={styles.noteDate}>{noteDate}</Text>
        <Pressable
          style={styles.noteEditButton}
          onPress={() => {
            setIsEditable(true);
          }}
        >
          {isEditable ? (
            <AntDesign name="save" size={24} color="black" />
          ) : (
            <AntDesign name="edit" size={24} color="black" />
          )}
        </Pressable>
        <Pressable
          style={styles.noteDeleteButton}
          onPress={() => {
            dispatch({ type: "removed_note", id: data.id });
          }}
        >
          <AntDesign
            style={styles.noteDeleteIcon}
            name="close"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
    </Motion.View>
  );
}

function notesReducer(state, action) {
  switch (action.type) {
    case "added_note": {
      return [
        { id: uuidv4(), date: "2023-08-06", text: "", color: action.color },
        ...state,
      ];
    }
    case "removed_note": {
      return state.filter((note) => note.id !== action.id);
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
}
const initialNotes = [
  {
    id: "a4f928b1-bfbf-4db4-96e3-86565198d1d0",
    date: "2023-08-05",
    text: "first note",
    color: "#ffbdda",
  },
  {
    id: "2d7124fb-9713-4365-859d-947dd435a5c9",
    date: "2023-08-05",
    text: "second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second notesecond note",
    color: "#ffd493",
  },
  {
    id: "b0134106-c106-447d-b7d7-5cf116c9d6b9",
    date: "2023-08-03",
    text: "3rd note",
    color: "#ffffad",
  },
  {
    id: "23bc2661-3d71-4b40-abfd-c8d740ad2dc0",
    date: "2023-08-02",
    text: "4th note",
    color: "#c1f0b2",
  },
  {
    id: "595f7dba-74a8-4108-9800-3c3f9216268f",
    date: "2023-08-01",
    text: "fifth note",
    color: "#9affff",
  },
  {
    id: "2b5141b9-cf2d-4346-b3cc-60165e48d352",
    date: "2023-08-01",
    text: "This is the sixth thing",
    color: "#a9bcff",
  },
];

function FabAction({ color, dispatch }) {
  return (
    <Pressable
      style={{ marginTop: 25 }}
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

export default function App() {
  const [searchText, onChangeSearchText] = useState("");
  const [notes, notesDispatch] = useReducer(notesReducer, initialNotes);
  const [isShownFab, setIsShownFab] = useReducer((hidden) => !hidden, false);
  const fabActions = [
    "#ffbdda",
    "#ffd493",
    "#ffffad",
    "#c1f0b2",
    "#9affff",
    "#a9bcff",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.leftRail}>
        <Text style={styles.logo}>Post-ems</Text>
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
              {fabActions.map((color) => {
                return (
                  <FabAction
                    key={color}
                    color={color}
                    dispatch={notesDispatch}
                  />
                );
              })}
            </Motion.View>
          )}
        </View>
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangeSearchText}
          placeholder="Search"
          value={searchText}
        />
        <Text style={styles.noteContainerTitle}>Notes</Text>
        <View style={styles.notesContainer}>
          <AnimatePresence>
            {notes
              .filter((note) => note.text.includes(searchText))
              .map((note) => {
                return (
                  <Note key={note.id} data={note} dispatch={notesDispatch} />
                );
              })}
          </AnimatePresence>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

//noteTextHeight+noteFooterHeight should add up to noteSize
const noteSize = 300;
const noteTextHeight = 250;
const noteFooterHeight = 50;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "aliceblue",
    height: "100%",
    flexDirection: "row",
  },
  leftRail: {
    flex: 1,
    borderRightWidth: 1,
    padding: 10,
    borderColor: "lightgray",
    alignItems: "center",
  },
  logo: { marginBottom: 20, fontWeight: 700 },
  fabContainer: { alignItems: "center" },
  addNoteButton: {},
  addNoteButtonIcon: {},
  fabItems: {},
  fabItem: { borderRadius: "50%", height: 25, width: 25 },
  mainContainer: {
    flex: 9,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  searchInput: { marginBottom: 20 },
  noteContainerTitle: {
    fontSize: 36,
    fontWeight: 600,
    lineHeight: 24,
    marginBottom: 20,
  },
  notesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  noteContainer: {
    flex: 1,
    flexShrink: 1,
    padding: 10,
    marginRight: 20,
    marginBottom: 20,
    minHeight: noteSize,
    maxHeight: noteSize,
    minWidth: noteSize,
    maxWidth: noteSize,
    backgroundColor: "#ffffad",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  noteText: {
    fontSize: 20,
  },
  noteTextInput: {
    height: noteTextHeight,
  },
  noteFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: noteFooterHeight,
  },
  noteDate: {},
  noteDeleteButton: {},
  noteDeleteIcon: {},
  noteEditButton: {},
});
