import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function CircularButton({
  style = {},
  text_style = {},
  size = 125,
  // using the rest operator to collect the "rest" of the props into a "props" object
  ...props
}) {
  return (
    //   passing props from component to the "external" StyleSheet API
    //   reloads on every render
    <TouchableOpacity
      style={[
        styles(size).button_style,
        style,
        props.disabled && styles(size).disabled_btn,
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text
        style={[
          styles(size).text,
          text_style,
          props.disabled && styles(size).disabled_text,
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = (size) =>
  StyleSheet.create({
    button_style: {
      borderRadius: size / 2,
      borderWidth: 3,
      borderColor: "#fff",
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "#fff",
      fontSize: size / 3,
    },
    disabled_btn: {
      borderColor: "#C5C5C550",
    },
    disabled_text: {
      color: "#C5C5C550",
    },
  });
