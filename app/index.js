import { StatusBar } from "expo-status-bar";
import { useReducer, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";

function Note({ data, dispatch }) {
  const [noteText, onChangeNoteText] = useState(data.text);
  const [noteDate, onChangeNoteDate] = useState(data.date); //TODO: onChangeNoteText should change NoteDate as well
  const [isEditable, setIsEditable] = useReducer(
    (editable) => !editable,
    false
  );

  return (
    <View style={styles.noteContainer}>
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
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

function notesReducer(state, action) {
  switch (action.type) {
    case "added_note": {
      return [{ id: uuidv4(), date: "2023-08-06", text: "" }, ...state];
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
  },
  {
    id: "2d7124fb-9713-4365-859d-947dd435a5c9",
    date: "2023-08-05",
    text: "second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second notesecond note",
  },
  {
    id: "b0134106-c106-447d-b7d7-5cf116c9d6b9",
    date: "2023-08-03",
    text: "3rd note",
  },
  {
    id: "23bc2661-3d71-4b40-abfd-c8d740ad2dc0",
    date: "2023-08-02",
    text: "4th note",
  },
  {
    id: "595f7dba-74a8-4108-9800-3c3f9216268f",
    date: "2023-08-01",
    text: "fifth note",
  },
];

export default function App() {
  const [searchText, onChangeSearchText] = useState("");
  const [notes, notesDispatch] = useReducer(notesReducer, initialNotes);

  return (
    <View style={styles.container}>
      <View style={styles.leftRail}>
        <Text style={styles.logo}>Post-ems</Text>
        <Pressable
          style={styles.addNoteButton}
          onPress={() => {
            notesDispatch({ type: "added_note" });
          }}
        >
          <AntDesign
            style={styles.addNoteButtonIcon}
            name="pluscircle"
            size={32}
            color="green"
          />
        </Pressable>
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangeSearchText}
          placeholder="Search"
          value={searchText}
        />
        <Text style={styles.noteTitle}>Notes</Text>
        <View style={styles.notesContainer}>
          {notes
            .filter((note) => note.text.includes(searchText))
            .map((note) => {
              return (
                <Note key={note.id} data={note} dispatch={notesDispatch} />
              );
            })}
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
  addNoteButton: {},
  addNoteButtonIcon: {},
  mainContainer: {
    flex: 9,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  searchInput: { marginBottom: 20 },
  notesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  noteTitle: { fontSize: 36, fontWeight: 600 },
  noteContainer: {
    flex: 1,
    flexShrink: 1,
    padding: 10,
    marginTop: 20,
    borderWidth: "1px",
    minHeight: noteSize,
    maxHeight: noteSize,
    minWidth: noteSize,
    maxWidth: noteSize,
    backgroundColor: "blanchedalmond",
    borderColor: "blanchedalmond",
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
  noteEditButton: {},
});
