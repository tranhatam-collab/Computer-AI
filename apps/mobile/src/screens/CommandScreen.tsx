import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from "react-native";
import { api, type Product, type Run } from "../api/client";

interface Props {
  locale: "vi" | "en";
  onSubmitted?: (run: Run) => void;
}

export function CommandScreen({ locale, onSubmitted }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Run | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getProducts().then((p) => {
      setProducts(p);
      if (p.length > 0) setSelected(p[0].id);
    }).catch(console.error);
  }, []);

  const handleSubmit = () => {
    if (!text.trim() || !selected) return;
    setLoading(true);
    setError("");
    api.command(text.trim(), selected)
      .then((res) => {
        setResult(res);
        onSubmitted?.(res);
      })
      .catch((err) => setError(err.message || "Error"))
      .finally(() => setLoading(false));
  };

  const labels = {
    vi: { title: "Lệnh mới", product: "Chọn sản phẩm", placeholder: "Nhập lệnh...", submit: "Gửi", sending: "Đang gửi..." },
    en: { title: "New Command", product: "Select product", placeholder: "Type command...", submit: "Send", sending: "Sending..." },
  };
  const t = labels[locale];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{t.title}</Text>
      <Text style={styles.label}>{t.product}</Text>
      <View style={styles.productList}>
        {products.map((p) => (
          <Pressable
            key={p.id}
            style={[styles.productChip, selected === p.id && styles.productChipActive]}
            onPress={() => setSelected(p.id)}
          >
            <Text style={[styles.productText, selected === p.id && styles.productTextActive]}>
              {p.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder={t.placeholder}
        placeholderTextColor="#64748b"
        value={text}
        onChangeText={setText}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {result ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>{locale === "vi" ? "Đã tạo tác vụ" : "Task created"}</Text>
          <Text style={styles.resultMeta}>{result.id}</Text>
        </View>
      ) : null}
      <Pressable style={[styles.submitBtn, loading && styles.submitBtnDisabled]} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.submitText}>{loading ? t.sending : t.submit}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 14 },
  header: { color: "#f7fafc", fontSize: 22, fontWeight: "700" },
  label: { color: "#aab4c0", fontSize: 14, marginTop: 8 },
  productList: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 6 },
  productChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, borderWidth: 1, borderColor: "#223148", backgroundColor: "#111826" },
  productChipActive: { backgroundColor: "#2f6bff", borderColor: "#2f6bff" },
  productText: { color: "#aab4c0", fontSize: 13, fontWeight: "600" },
  productTextActive: { color: "#f7fafc" },
  input: { backgroundColor: "#111826", color: "#f7fafc", borderRadius: 14, borderWidth: 1, borderColor: "#223148", padding: 16, fontSize: 16, minHeight: 100, textAlignVertical: "top" },
  error: { color: "#ef4444", fontSize: 14 },
  resultCard: { backgroundColor: "#064e3b", borderRadius: 14, padding: 16, borderWidth: 1, borderColor: "#065f46" },
  resultTitle: { color: "#34d399", fontWeight: "700", fontSize: 16 },
  resultMeta: { color: "#aab4c0", fontSize: 12, marginTop: 6 },
  submitBtn: { backgroundColor: "#2f6bff", borderRadius: 14, paddingVertical: 16, alignItems: "center", marginTop: 8 },
  submitBtnDisabled: { opacity: 0.6 },
  submitText: { color: "#f7fafc", fontWeight: "700", fontSize: 16 },
});
