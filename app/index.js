import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";

function Note() {
  return (
    <View style={styles.noteContainer}>
      <Text style={styles.noteText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Morbi tristique
        senectus et netus et. Sit amet luctus venenatis lectus magna fringilla
        urna.
      </Text>
      <View style={styles.noteFooter}>
        <Text style={styles.noteDate}>August 4, 2023</Text>
        <Pressable style={styles.editNoteButton}>Edit</Pressable>
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
          <Text>Add</Text>
        </Pressable>
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangeSearchText}
          placeholder="Search"
          value={searchText}
        />
        <Text>Notes</Text>
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
  },
  searchInput: { marginBottom: 20 },
  notesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  noteContainer: {
    flex: 1,
    padding: 10,
    marginTop: 20,
    borderWidth: "1px",
    minWidth: "300px",
    backgroundColor: "blanchedalmond",
    borderColor: "blanchedalmond",
    borderRadius: 10,
  },
  noteText: {
    fontSize: 20,
  },
  noteFooter: { flexDirection: "row", justifyContent: "space-between" },
  noteDate: {},
  noteEditButton: {},
});
