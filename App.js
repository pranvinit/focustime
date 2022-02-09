import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

// screen imports
import FocusScreen from "./src/screens/focusScreen/FocusScreen";
import FocusHistory from "./src/screens/focusScreen/FocusHistory";
import TimerScreen from "./src/screens/timerScreen/TimerScreen";

import { spacing } from "./src/utils/spacing";
import { colors } from "./src/utils/colors";

const STATUES = {
  CANCELLED: 0,
  COMPLETED: 1,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addToFocusHistory = (subject, status) => {
    const key = focusHistory.length + 1;
    setFocusHistory([...focusHistory, { subject, status, key }]);
  };

  const handleClearSubject = () => {
    setFocusSubject(null);
    const key = focusHistory.length + 1;
    addToFocusHistory(focusSubject, STATUES.CANCELLED, key);
  };

  const handleTimerEnd = () => {
    setFocusSubject(null);
    const key = focusHistory.length + 1;
    addToFocusHistory(focusSubject, STATUES.COMPLETED, key);
  };

  const onFocusHistoryClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorageLib.setItem(
        "focusHistory",
        JSON.stringify(focusHistory)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorageLib.getItem("focusHistory");
      if (history && history.length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  useEffect(() => {
    loadFocusHistory();
  }, []);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <TimerScreen
          timer_end={handleTimerEnd}
          clear_subject={handleClearSubject}
          focusSubject={focusSubject}
        />
      ) : (
        <>
          <FocusScreen setFocusSubject={setFocusSubject} />
          <FocusHistory
            focus_history={focusHistory}
            onClear={onFocusHistoryClear}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? spacing.md : spacing.lg,
    backgroundColor: colors.dark_blue,
  },
});
