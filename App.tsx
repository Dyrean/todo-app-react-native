import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Pressable, Button } from "react-native";

import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TaskItem from "./components/TaskItem";
import TaskInput from "./components/TaskInput";

export default function App() {
  const [taskList, setTaskList] = useState<string[]>([]);
  const [modelVisible, setModelVisible] = useState(false);

  const getTaskListStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@taskList");
      jsonValue != null ? setTaskList(JSON.parse(jsonValue)) : setTaskList([]);
    } catch (error) {
      console.log(error);
    }
  };

  const setTaskListStorage = async () => {
    try {
      AsyncStorage.setItem("@taskList", JSON.stringify(taskList));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskListStorage();
  }, []);

  useEffect(() => {
    setTaskListStorage();
  }, [taskList]);

  function toggleModel() {
    setModelVisible(!modelVisible);
  }

  function addTask(enteredTaskText: string) {
    setTaskList((currentTask: string[]) => [...currentTask, enteredTaskText]);
    toggleModel();
  }

  function handleTaskPress(removedTaskIndex: number) {
    const array = [...taskList];
    array.splice(removedTaskIndex, 1);
    setTaskList([...array]);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title="Add New Task" color="#8f4ce7" onPress={toggleModel} />
        <TaskInput
          addTask={addTask}
          visible={modelVisible}
          onCancel={toggleModel}
        />
        <View style={styles.tasksContainer}>
          <FlatList
            alwaysBounceVertical={false}
            data={taskList}
            renderItem={(itemData) => {
              const { item, index } = itemData;
              return (
                <Pressable
                  android_ripple={{ color: "#311b6b" }}
                  onPress={() => handleTaskPress(index)}
                  style={({ pressed }) => pressed && styles.pressItem}
                >
                  <TaskItem item={`${index + 1}-${item}`} />
                </Pressable>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 16,
  },
  pressItem: {
    opacity: 0.5,
  },
  tasksContainer: {
    flex: 4,
  },
});
