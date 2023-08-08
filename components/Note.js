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
import { Motion } from "@legendapp/motion";

export function Note({ data, dispatch }) {
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

//noteTextHeight+noteFooterHeight should add up to noteSize
const noteSize = 300;
const noteTextHeight = 250;
const noteFooterHeight = 50;
const styles = StyleSheet.create({
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
  noteContainerTitle: {
    fontSize: 36,
    fontWeight: 600,
    marginBottom: 20,
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
