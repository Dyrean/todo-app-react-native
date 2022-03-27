import { View, Text, StyleSheet } from "react-native";
import React from "react";

type Props = {
  item: string;
};

const TaskItem = ({ item }: Props) => {
  return (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default TaskItem;
