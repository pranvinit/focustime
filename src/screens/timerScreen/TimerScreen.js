import React, { useState } from "react";
import { StyleSheet, Text, View, Vibration, Platform } from "react-native";
import { ProgressBar } from "react-native-paper";

import { useKeepAwake } from "expo-keep-awake";

import { spacing, font_sizes } from "../../utils/spacing";

import Timing from "./Timing";

// component imports
import Countdown from "../../components/Countdown";
import CircularButton from "../../components/CircularButton";

const DEFAULT_TIME = 10;

export default function TimerScreen({
  clear_subject,
  focusSubject,
  timer_end,
}) {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setTimeout(() => Vibration.vibrate(), 400);
      setTimeout(() => clearInterval(interval), 10 * 1000);
    } else {
      Vibration.vibrate(10 * 1000);
    }
  };

  // invoked when countdown ends
  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(0);
    setIsStarted(false);
    timer_end();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(0);
    setIsStarted(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.text_container}>
        <Text style={styles.text}>Focusing on: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.countdown_container}>
        <Countdown
          isPaused={!isStarted}
          onProgress={onProgress}
          mins={minutes}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.progress_container}>
        <ProgressBar
          color="#5384e2"
          style={styles.progress_bar}
          progress={progress}
        />
      </View>
      <View style={styles.timing_container}>
        <Timing time={minutes} changeTime={changeTime} />
      </View>
      <View style={styles.duration_btns}></View>
      <View style={styles.countdown_btns}>
        {!isStarted ? (
          <CircularButton
            title="start"
            text_style={{ fontSize: font_sizes.xl }}
            onPress={() => setIsStarted(true)}
          />
        ) : (
          <CircularButton
            title="pause"
            text_style={{ fontSize: font_sizes.xl }}
            onPress={() => setIsStarted(false)}
          />
        )}
      </View>
      <View style={styles.cancel_btn}>
        <CircularButton title="-" size={50} onPress={() => clear_subject()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text_container: {
    paddingTop: spacing.xxxl,
  },
  text: {
    color: "#fff",
    fontSize: font_sizes.md,
    textAlign: "center",
  },
  task: {
    color: "#fff",
    fontSize: font_sizes.lg,
    fontWeight: "700",
    textAlign: "center",
  },
  countdown_container: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  countdown_btns: {
    flex: 0.25,
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  progress_container: {
    paddingBottom: spacing.md,
  },
  progress_bar: {
    height: 10,
  },
  timing_container: {
    flex: 0.25,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  cancel_btn: {
    padding: 25,
  },
});
