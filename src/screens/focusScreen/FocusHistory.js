import { StyleSheet, Text, SafeAreaView, View, FlatList } from "react-native";
import React from "react";

import { font_sizes, spacing } from "../../utils/spacing";

// component imports
import CircularButton from "../../components/CircularButton";

export default function FocusHistory({ focus_history, onClear }) {
  const historyItem = ({ item, index }) => (
    <Text style={styles.history_item(item.status)}>{item.subject}</Text>
  );

  return (
    <SafeAreaView style={styles.container_view}>
      {focus_history.length >= 1 && (
        <>
          <Text style={styles.title}>Tasks we've focused on: </Text>
          <FlatList
            style={styles.data_list}
            data={focus_history}
            renderItem={historyItem}
          />

          <View style={styles.clear_btn}>
            <CircularButton size={75} onPress={() => onClear()} title="clear" />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_view: {
    flex: 1,
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  data_list: {
    flex: 1,
  },
  history_item: (status) => ({
    color: status ? "green" : "red",
    fontWeight: "700",
    fontSize: font_sizes.lg,
  }),
  title: {
    color: "#fff",
    fontSize: font_sizes.lg,
    paddingBottom: spacing.md,
  },
  clear_btn: {
    alignItems: "center",
    padding: spacing.md,
  },
});
