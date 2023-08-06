import { StatusBar } from "expo-status-bar";
import { useState, useReducer } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function Note() {
  const [noteText, onChangeNoteText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et. Sit amet luctus venenatis lectus magna fringilla urna."
  );
  const [isEditable, setIsEditable] = useReducer(
    (editable) => !editable,
    false
  );
  return (
    <View style={styles.noteContainer}>
      {isEditable ? (
        <TextInput
          style={styles.noteText}
          multiline={true}
          onChangeText={onChangeNoteText}
          value={noteText}
        >
          {noteText}
        </TextInput>
      ) : (
        <Text style={styles.noteText}>{noteText}</Text>
      )}

      <View style={styles.noteFooter}>
        <Text style={styles.noteDate}>August 5, 2023</Text>

        <Pressable
          style={styles.editNoteButton}
          onPress={() => {
            setIsEditable(true);
          }}
        >
          <Text>Edit</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function App() {
  const [searchText, onChangeSearchText] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.leftRail}>
        <Text style={styles.logo}>Post-ems</Text>
        <Pressable style={styles.addNoteButton}>
          <Text>Add Note</Text>
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
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
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
  addNoteButton: {},
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
    padding: 10,
    marginTop: 20,
    borderWidth: "1px",
    minWidth: "300px",
    backgroundColor: "blanchedalmond",
    borderColor: "blanchedalmond",
    borderRadius: 10,
    justifyContent: "flex-end",
  },
  noteText: {
    fontSize: 20,
  },
  noteFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noteDate: {},
  noteEditButton: {},
});
