import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { api, type Run } from "../api/client";

interface Props {
  locale: "vi" | "en";
}

export function ResultsScreen({ locale }: Props) {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getRuns().then((all) => {
      setRuns(all.filter((r) => r.state === "completed"));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const completed = runs;

  return (
    <FlatList
      data={completed}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<Text style={styles.header}>{locale === "vi" ? "Kết quả" : "Results"}</Text>}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title} numberOfLines={2}>{item.text}</Text>
          <Text style={styles.meta}>{item.id}</Text>
        </View>
      )}
      ListEmptyComponent={<Text style={styles.empty}>{loading ? "Loading..." : locale === "vi" ? "Chưa có kết quả" : "No results yet"}</Text>}
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
