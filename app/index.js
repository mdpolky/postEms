import { StatusBar } from "expo-status-bar";
import { useReducer, useState } from "react";
import {
  Pressable,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, Motion } from "@legendapp/motion";
import { Note } from "../components/Note";
import { Fab } from "../components/Fab";

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

export default function App() {
  const [searchText, onChangeSearchText] = useState("");
  const [notes, notesDispatch] = useReducer(notesReducer, initialNotes);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leftRail}>
        <Text style={styles.logo}>Post-ems</Text>
        <Fab dispatch={notesDispatch} />
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
    </SafeAreaView>
  );
}

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
  mainContainer: {
    flex: 5,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  searchInput: { marginBottom: 20 },
  noteContainerTitle: {
    fontSize: 36,
    fontWeight: 600,
    marginBottom: 20,
  },
  notesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
