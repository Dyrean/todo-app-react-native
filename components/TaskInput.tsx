import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Image,
} from "react-native";
import { useState } from "react";

type Props = {
  addTask: (enteredTaskText: string) => void;
  visible: boolean;
  onCancel: () => void;
};

const TaskInput = ({ addTask, visible, onCancel }: Props) => {
  const [inputTask, setInputTask] = useState("");

  function handleTextInputChange(text: string) {
    setInputTask(text);
  }

  function addTaskHandle() {
    addTask(inputTask);
    setInputTask("");
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/task.png")}
          style={styles.image}
        />
        <TextInput
          style={styles.textInput}
          value={inputTask}
          onChangeText={handleTextInputChange}
          placeholder="Enter Task To Do!"
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onCancel} color="#f13b96" />
          </View>
          <View style={styles.button}>
            <Button title="Add Task" onPress={addTaskHandle} color="#8f4ce7" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    borderRadius: 8,
    width: "100%",
    padding: 16,
    color: "#120438",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  button: {
    width: "35%",
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 24,
  },
});

export default TaskInput;
