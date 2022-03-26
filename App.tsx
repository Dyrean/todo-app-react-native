import { useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [inputTask, setInputTask] = useState("");
  const [taskList, setTaskList] = useState<string[]>([]);

  function handleTextInputChange(text: string) {
    setInputTask(text);
  }

  function handleAddButton(event: NativeSyntheticEvent<NativeTouchEvent>) {
    event.preventDefault();
    setTaskList((currentTask: string[]) => [inputTask, ...currentTask]);
  }

  function handleTaskPress(removedTaskIndex: number) {
    const array = [...taskList];
    array.splice(removedTaskIndex, 1);
    setTaskList([...array]);
  }

  return (
    <>
      <View style={styles.appContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputTask}
            onChangeText={handleTextInputChange}
            placeholder="Enter Task To Do!"
          />
          <Button title="Add" onPress={handleAddButton} />
        </View>
        <View style={styles.tasksContainer}>
          <FlatList
            alwaysBounceVertical={false}
            data={taskList}
            renderItem={(itemData) => {
              const { item, index } = itemData;
              return (
                <TouchableOpacity onPress={() => handleTaskPress(index)}>
                  <View style={styles.taskItem}>
                    <Text style={styles.taskText}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    padding: 8,
  },
  tasksContainer: {
    flex: 4,
  },
  taskItem: {
    margin: 8,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "purple",
  },
  taskText: {
    color: "white",
  },
});
