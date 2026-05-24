import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { vi } from "./src/data/vi";
import { en } from "./src/data/en";
import { productShells } from "./src/products";

type Locale = "vi" | "en";
type Shell = keyof typeof productShells;

export default function App() {
  const [locale, setLocale] = useState<Locale>("vi");
  const [shell, setShell] = useState<Shell>("creator");
  const content = useMemo(() => (locale === "vi" ? vi : en), [locale]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.title}>{content.appTitle}</Text>
            <Text style={styles.subtitle}>{content.subtitle}</Text>
          </View>
          <Pressable style={styles.localeBtn} onPress={() => setLocale(locale === "vi" ? "en" : "vi")}>
            <Text style={styles.localeText}>{locale === "vi" ? "EN" : "VI"}</Text>
          </Pressable>
        </View>
        <Text style={styles.blockTitle}>Active product shell</Text>
        <View style={styles.shellSwitch}>
          {Object.keys(productShells).map((key) => (
            <Pressable key={key} onPress={() => setShell(key as Shell)}
              style={[styles.shellBtn, shell === key && styles.shellBtnActive]}>
              <Text style={styles.shellBtnText}>{key}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{shell.toUpperCase()}</Text>
          {(productShells[shell] as readonly string[]).map((item) => (
            <Text key={item} style={styles.cardItem}>• {item}</Text>
          ))}
        </View>
        <Text style={styles.blockTitle}>Phase 1 tabs</Text>
        <View style={styles.grid}>
          {content.sections.map((section) => (
            <View key={section} style={styles.tile}>
              <Text style={styles.tileText}>{section}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b0f14" },
  container: { padding: 20, gap: 18 },
  topRow: { flexDirection: "row", justifyContent: "space-between", gap: 12, alignItems: "flex-start" },
  title: { color: "#f7fafc", fontSize: 24, fontWeight: "700" },
  subtitle: { color: "#aab4c0", marginTop: 8, lineHeight: 20 },
  localeBtn: { borderWidth: 1, borderColor: "#223148", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  localeText: { color: "#f7fafc", fontWeight: "700" },
  blockTitle: { color: "#f7fafc", fontSize: 18, fontWeight: "700" },
  shellSwitch: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  shellBtn: { borderWidth: 1, borderColor: "#223148", borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  shellBtnActive: { backgroundColor: "#2f6bff", borderColor: "#2f6bff" },
  shellBtnText: { color: "#f7fafc" },
  card: { backgroundColor: "#111826", borderWidth: 1, borderColor: "#223148", borderRadius: 18, padding: 16 },
  cardTitle: { color: "#f7fafc", fontWeight: "700", marginBottom: 10 },
  cardItem: { color: "#aab4c0", lineHeight: 22 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  tile: { width: "48%", backgroundColor: "#151f30", borderRadius: 14, padding: 14 },
  tileText: { color: "#f7fafc", fontWeight: "600" }
});
