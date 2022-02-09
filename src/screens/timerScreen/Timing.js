import React from "react";
import { StyleSheet, Text, View } from "react-native";

// component imports
import CircularButton from "../../components/CircularButton";

export default function Timing({ time, changeTime }) {
  return (
    <View style={styles.container}>
      <View style={styles.timing_btn}>
        <CircularButton
          size={75}
          title="-"
          disabled={time <= 10}
          onPress={() => changeTime(time - 10)}
        />
      </View>
      <View style={styles.timing_btn}>
        <CircularButton size={75} title="10" />
      </View>
      <View style={styles.timing_btn}>
        <CircularButton
          size={75}
          title="+"
          disabled={time >= 60}
          onPress={() => changeTime(time + 10)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  timing_btn: {
    alignItems: "center",
  },
});
