import React, { useMemo, useState } from "react";
import { SafeAreaView, Text, View, Pressable, StyleSheet } from "react-native";
import { vi } from "./src/data/vi";
import { en } from "./src/data/en";
import { TaskListScreen } from "./src/screens/TaskListScreen";
import { TaskDetailScreen } from "./src/screens/TaskDetailScreen";
import { ApprovalsScreen } from "./src/screens/ApprovalsScreen";
import { ResultsScreen } from "./src/screens/ResultsScreen";

type Locale = "vi" | "en";
type Screen = { type: "tasks" } | { type: "task-detail"; id: string } | { type: "approvals" } | { type: "results" };

const tabs = ["tasks", "approvals", "results"] as const;

export default function App() {
  const [locale, setLocale] = useState<Locale>("vi");
  const [screen, setScreen] = useState<Screen>({ type: "tasks" });
  const [tab, setTab] = useState<string>("tasks");
  const content = useMemo(() => (locale === "vi" ? vi : en), [locale]);

  const tabLabel = (key: string) => {
    const map: Record<string, { vi: string; en: string }> = {
      tasks: { vi: "Tác vụ", en: "Tasks" },
      approvals: { vi: "Duyệt", en: "Approvals" },
      results: { vi: "Kết quả", en: "Results" },
    };
    return map[key]?.[locale] || key;
  };

  const renderScreen = () => {
    switch (screen.type) {
      case "task-detail":
        return <TaskDetailScreen runId={screen.id} locale={locale} onBack={() => setScreen({ type: "tasks" })} />;
      case "approvals":
        return <ApprovalsScreen approvals={[]} locale={locale} />;
      case "results":
        return <ResultsScreen runs={[]} locale={locale} />;
      default:
        return <TaskListScreen locale={locale} onSelectRun={(id) => setScreen({ type: "task-detail", id })} />;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>{content.appTitle}</Text>
        <Pressable style={styles.localeBtn} onPress={() => setLocale(locale === "vi" ? "en" : "vi")}>
          <Text style={styles.localeText}>{locale === "vi" ? "EN" : "VI"}</Text>
        </Pressable>
      </View>
      <View style={styles.tabBar}>
        {tabs.map((t) => (
          <Pressable key={t} style={[styles.tab, tab === t && styles.tabActive]} onPress={() => { setTab(t); setScreen({ type: t === "tasks" ? "tasks" : t === "approvals" ? "approvals" : "results" } as Screen); }}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{tabLabel(t)}</Text>
          </Pressable>
        ))}
      </View>
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b0f14" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#223148" },
  title: { color: "#f7fafc", fontSize: 20, fontWeight: "700" },
  localeBtn: { borderWidth: 1, borderColor: "#223148", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  localeText: { color: "#f7fafc", fontWeight: "700" },
  tabBar: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#223148" },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center" },
  tabActive: { borderBottomWidth: 2, borderBottomColor: "#2f6bff" },
  tabText: { color: "#aab4c0", fontSize: 14 },
  tabTextActive: { color: "#f7fafc", fontWeight: "700" },
});
