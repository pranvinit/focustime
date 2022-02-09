import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

import { font_sizes, spacing } from "../utils/spacing";

const minToMs = (mins) => mins * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export default function Countdown({ mins = 10, isPaused, onProgress, onEnd }) {
  const [ms, setMs] = useState(minToMs(mins));
  const countdownInterval = useRef(null);

  const countdown = () => {
    setMs((time) => {
      if (time === 0) {
        if (countdownInterval.current) clearInterval(countdownInterval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMs(minToMs(mins));
  }, [mins]);

  useEffect(() => {
    onProgress(1 - ms / minToMs(mins));
    if (ms === 0) {
      onEnd();
    }
  }, [ms]);

  useEffect(() => {
    if (isPaused) {
      return;
    }
    countdownInterval.current = setInterval(countdown, 1000);
    return () => clearInterval(countdownInterval.current);
  }, [isPaused]);

  const minutes = Math.floor(ms / 1000 / 60);
  const seconds = Math.floor(ms / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minutes)} : {formatTime(seconds)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: font_sizes.xxxl,
    fontWeight: "700",
    padding: spacing.lg,
    backgroundColor: "rgba(94, 132, 226, 0.3)",
  },
});
