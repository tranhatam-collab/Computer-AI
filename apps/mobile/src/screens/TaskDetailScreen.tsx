import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { api, type Run } from "../api/client";

interface Props {
  runId: string;
  locale: "vi" | "en";
  onBack: () => void;
}

export function TaskDetailScreen({ runId, locale, onBack }: Props) {
  const [run, setRun] = useState<Run | null>(null);

  useEffect(() => {
    api.getRun(runId).then(setRun).catch(console.error);
  }, [runId]);

  if (!run) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.back} onPress={onBack}>← {locale === "vi" ? "Quay lại" : "Back"}</Text>
      <Text style={styles.title}>{run.text}</Text>
      <View style={styles.field}><Text style={styles.label}>{locale === "vi" ? "ID" : "ID"}</Text><Text style={styles.value}>{run.id}</Text></View>
      <View style={styles.field}><Text style={styles.label}>{locale === "vi" ? "Trạng thái" : "State"}</Text><Text style={styles.value}>{run.state}</Text></View>
      <View style={styles.field}><Text style={styles.label}>{locale === "vi" ? "Sản phẩm" : "Product"}</Text><Text style={styles.value}>{run.productId}</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  loading: { color: "#aab4c0", textAlign: "center", marginTop: 40 },
  back: { color: "#2f6bff", fontSize: 16 },
  title: { color: "#f7fafc", fontSize: 22, fontWeight: "700" },
  field: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#223148" },
  label: { color: "#aab4c0", fontSize: 14 },
  value: { color: "#f7fafc", fontSize: 14, fontWeight: "600" },
});
