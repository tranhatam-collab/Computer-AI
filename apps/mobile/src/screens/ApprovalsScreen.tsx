import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import type { Approval } from "../api/client";

interface Props {
  approvals: Approval[];
  locale: "vi" | "en";
}

export function ApprovalsScreen({ approvals, locale }: Props) {
  return (
    <FlatList
      data={approvals}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<Text style={styles.header}>{locale === "vi" ? "Phê duyệt" : "Approvals"}</Text>}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.action}</Text>
          <Text style={styles.meta}>{item.resource} — {item.state}</Text>
        </View>
      )}
      ListEmptyComponent={<Text style={styles.empty}>{locale === "vi" ? "Không có mục nào" : "No items"}</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 12 },
  header: { color: "#f7fafc", fontSize: 22, fontWeight: "700", marginBottom: 12 },
  card: { backgroundColor: "#111826", borderRadius: 14, padding: 16, borderWidth: 1, borderColor: "#223148" },
  title: { color: "#f7fafc", fontSize: 16, fontWeight: "600" },
  meta: { color: "#aab4c0", fontSize: 12, marginTop: 6 },
  empty: { color: "#aab4c0", textAlign: "center", marginTop: 40 },
});
