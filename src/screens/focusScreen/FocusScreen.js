import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { font_sizes, spacing } from "../../utils/spacing";

import { TextInput } from "react-native-paper";

// component imports
import CircularButton from "../../components/CircularButton";

export default function FocusScreen({ setFocusSubject }) {
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <Text style={styles.title}>What would you like to focus on ?</Text>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            label="Enter focus subject"
            onChangeText={(value) => setSubject(value)}
          />
          <CircularButton
            title="+"
            size={75}
            onPress={() => setFocusSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  container: {
    flex: 0.5,
    padding: spacing.md,
    marginTop: spacing.xxl,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: font_sizes.lg,
    fontWeight: "700",
  },
  input_container: {
    paddingTop: spacing.md,
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    flex: 1,
    marginRight: spacing.md,
  },
});
