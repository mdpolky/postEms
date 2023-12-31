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
  const originalNote = data.text;
  const [noteDate, setNoteDate] = useState(data.date);
  const [isEditable, toggleIsEditable] = useReducer(
    (editable) => !editable,
    false
  );
  const updateNote = () => {
    toggleIsEditable();
    if (originalNote !== noteText) {
      const updatedDate = new Date().toLocaleString();
      setNoteDate(updatedDate);
      dispatch({
        type: "updated_note",
        id: data.id,
        text: noteText,
        date: updatedDate,
      });
    }
  };
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
      <View style={styles.noteContent}>
        {isEditable ? (
          <TextInput
            autoFocus={true}
            style={[styles.noteText, styles.noteTextInput]}
            multiline={true}
            onChangeText={onChangeNoteText}
            value={noteText}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.noteText}>{noteText}</Text>
          </ScrollView>
        )}
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
            color="#708090"
          />
        </Pressable>
      </View>

      <View style={styles.noteFooter}>
        <Text style={styles.noteDate}>{noteDate}</Text>
        <Pressable
          style={styles.noteEditButton}
          onPress={() => {
            isEditable ? updateNote() : toggleIsEditable();
          }}
        >
          <AntDesign
            name={isEditable ? "save" : "edit"}
            size={24}
            color="white"
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
    padding: 10,
    minHeight: noteSize,
    maxHeight: noteSize,
    minWidth: noteSize,
    maxWidth: noteSize,
    backgroundColor: "#ffffad",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  noteContent: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  noteText: {
    fontSize: 20,
    color: "#708090",
  },
  noteTextInput: {
    height: noteTextHeight,
  },
  noteEditButton: {
    backgroundColor: "#708090",
    borderRadius: "50%",
    padding: 10,
  },
  noteFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: noteFooterHeight,
  },
  noteDate: {
    color: "#708090",
    fontWeight: "100",
  },
});
