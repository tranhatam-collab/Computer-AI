import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { api, type Run } from "../api/client";

interface Props {
  locale: "vi" | "en";
  onSelectRun: (id: string) => void;
}

export function TaskListScreen({ locale, onSelectRun }: Props) {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getRuns().then(setRuns).catch(console.error).finally(() => setLoading(false));
  }, []);

  const statusColor = (state: string) => {
    switch (state) {
      case "completed": return "#34d399";
      case "running": return "#2f6bff";
      case "failed": return "#ef4444";
      default: return "#aab4c0";
    }
  };

  return (
    <FlatList
      data={runs}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<Text style={styles.header}>{locale === "vi" ? "Tác vụ" : "Tasks"}</Text>}
      renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => onSelectRun(item.id)}>
          <View style={styles.row}>
            <View style={[styles.dot, { backgroundColor: statusColor(item.state) }]} />
            <Text style={styles.title} numberOfLines={1}>{item.text}</Text>
          </View>
          <Text style={styles.meta}>{item.id} — {item.state}</Text>
        </Pressable>
      )}
      ListEmptyComponent={<Text style={styles.empty}>{loading ? "Loading..." : locale === "vi" ? "Chưa có tác vụ" : "No tasks yet"}</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 12 },
  header: { color: "#f7fafc", fontSize: 22, fontWeight: "700", marginBottom: 12 },
  card: { backgroundColor: "#111826", borderRadius: 14, padding: 16, borderWidth: 1, borderColor: "#223148" },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  title: { color: "#f7fafc", fontSize: 16, fontWeight: "600", flex: 1 },
  meta: { color: "#aab4c0", fontSize: 12, marginTop: 8 },
  empty: { color: "#aab4c0", textAlign: "center", marginTop: 40 },
});
