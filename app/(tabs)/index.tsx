import * as React from "react";
import {StyleSheet} from "react-native";
import RenderMessages from '../../components/RenderMessages';
import {StatusBar} from "expo-status-bar";

export default function Messages() {
  return (
      <RenderMessages />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 700,
    borderRadius: 4,
    padding: 10,
    rowGap: 8,
    backgroundColor: 'white'
  },
  flexing: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 3,
  },
  title: {
    fontSize: 16,
  },
  message: {
    fontSize: 14,
  },
  time: {
    color: '#575757',
    fontSize: 10,
  },
})