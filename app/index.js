import { StatusBar } from "expo-status-bar";
import { useReducer, useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Crypto from "expo-crypto";
import { AnimatePresence } from "@legendapp/motion";
import { Note } from "../components/Note";
import { Fab } from "../components/Fab";

const initialNotes = [
  {
    id: "a4f928b1-bfbf-4db4-96e3-86565198d1d0",
    date: "8/1/2023, 12:34:56 PM",
    text: "first note",
    color: "#ffbdda",
  },
  {
    id: "2d7124fb-9713-4365-859d-947dd435a5c9",
    date: "8/1/2023, 12:34:56 PM",
    text: "second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second note second notesecond note",
    color: "#ffd493",
  },
  {
    id: "b0134106-c106-447d-b7d7-5cf116c9d6b9",
    date: "8/1/2023, 12:34:56 PM",
    text: "3rd note",
    color: "#ffffad",
  },
  {
    id: "23bc2661-3d71-4b40-abfd-c8d740ad2dc0",
    date: "8/1/2023, 12:34:56 PM",
    text: "4th note",
    color: "#c1f0b2",
  },
  {
    id: "595f7dba-74a8-4108-9800-3c3f9216268f",
    date: "8/1/2023, 12:34:56 PM",
    text: "fifth note",
    color: "#9affff",
  },
  {
    id: "2b5141b9-cf2d-4346-b3cc-60165e48d352",
    date: "8/1/2023, 12:34:56 PM",
    text: "This is the sixth thing",
    color: "#a9bcff",
  },
];

function notesReducer(state, action) {
  switch (action.type) {
    case "added_note": {
      return [
        {
          id: Crypto.randomUUID(),
          date: new Date().toLocaleString(),
          text: "",
          color: action.color,
        },
        ...state,
      ];
    }
    case "updated_note": {
      const index = state.findIndex((note) => note.id === action.id);
      const newArray = [...state];
      newArray[index].text = action.text;
      return newArray;
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
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {Platform.OS === "web" && (
          <View style={styles.leftRail}>
            <Text style={styles.logo}>Post-ems</Text>
            <Fab dispatch={notesDispatch} />
          </View>
        )}
        {/* TODO: center on mobile */}
        <View style={styles.mainContainer}>
          <ScrollView>
            <TextInput
              style={styles.searchInput}
              onChangeText={onChangeSearchText}
              placeholder="Search"
              value={searchText}
            />
            <Text style={styles.noteContainerTitle}>Notes</Text>
            <View style={styles.notesContainer}>
              {/* TODO: make filter case-insensitive */}
              <AnimatePresence>
                {notes
                  .filter((note) => note.text.includes(searchText))
                  .map((note) => {
                    return (
                      <Note
                        key={note.id}
                        data={note}
                        dispatch={notesDispatch}
                      />
                    );
                  })}
              </AnimatePresence>
            </View>
          </ScrollView>
        </View>
      </View>
      {Platform.OS === "ios" && (
        <View style={styles.mobileFooter}>
          <Fab dispatch={notesDispatch} />
        </View>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "#faf8f6" },
  container: {
    flex: 1,
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
    justifyContent: Platform.OS === "ios" ? "center" : "flex-start",
    gap: 20,
  },
  mobileFooter: {
    height: 50,
  },
});
