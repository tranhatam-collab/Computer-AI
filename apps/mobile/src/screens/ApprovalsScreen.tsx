import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { api, type Approval } from "../api/client";

interface Props {
  locale: "vi" | "en";
}

export function ApprovalsScreen({ locale }: Props) {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    api.getApprovals().then(setApprovals).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { refresh(); }, []);

  const handleApprove = (id: string) => {
    api.approve(id).then(refresh).catch(console.error);
  };

  const handleReject = (id: string) => {
    api.reject(id).then(refresh).catch(console.error);
  };

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
          <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.approve]} onPress={() => handleApprove(item.id)}>
              <Text style={styles.btnText}>{locale === "vi" ? "Duyệt" : "Approve"}</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.reject]} onPress={() => handleReject(item.id)}>
              <Text style={styles.btnText}>{locale === "vi" ? "Từ chối" : "Reject"}</Text>
            </Pressable>
          </View>
        </View>
      )}
      ListEmptyComponent={<Text style={styles.empty}>{loading ? "Loading..." : locale === "vi" ? "Không có mục nào" : "No items"}</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 12 },
  header: { color: "#f7fafc", fontSize: 22, fontWeight: "700", marginBottom: 12 },
  card: { backgroundColor: "#111826", borderRadius: 14, padding: 16, borderWidth: 1, borderColor: "#223148" },
  title: { color: "#f7fafc", fontSize: 16, fontWeight: "600" },
  meta: { color: "#aab4c0", fontSize: 12, marginTop: 6 },
  actions: { flexDirection: "row", gap: 10, marginTop: 12 },
  btn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: "center" },
  approve: { backgroundColor: "#059669" },
  reject: { backgroundColor: "#dc2626" },
  btnText: { color: "#f7fafc", fontWeight: "700", fontSize: 14 },
  empty: { color: "#aab4c0", textAlign: "center", marginTop: 40 },
});
