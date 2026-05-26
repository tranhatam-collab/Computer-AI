import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, Text, View, Pressable, StyleSheet } from "react-native";
import { vi } from "./src/data/vi";
import { en } from "./src/data/en";
import { api } from "./src/api/client";
import { TaskListScreen } from "./src/screens/TaskListScreen";
import { TaskDetailScreen } from "./src/screens/TaskDetailScreen";
import { ApprovalsScreen } from "./src/screens/ApprovalsScreen";
import { ResultsScreen } from "./src/screens/ResultsScreen";
import { CommandScreen } from "./src/screens/CommandScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import {
  registerForPushNotificationsAsync,
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
} from "./src/services/notifications";

type Locale = "vi" | "en";
type Screen = { type: "tasks" } | { type: "task-detail"; id: string } | { type: "approvals" } | { type: "results" } | { type: "command" };

const tabs = ["command", "tasks", "approvals", "results"] as const;

export default function App() {
  const [locale, setLocale] = useState<Locale>("vi");
  const [screen, setScreen] = useState<Screen>({ type: "tasks" });
  const [tab, setTab] = useState<string>("tasks");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const content = useMemo(() => (locale === "vi" ? vi : en), [locale]);

  useEffect(() => {
    api.me()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false))
      .finally(() => setCheckingAuth(false));
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    let cancelled = false;
    registerForPushNotificationsAsync().then((token) => {
      if (cancelled || !token) return;
      api.registerPushToken(token).catch(() => {});
    });
    return () => { cancelled = true; };
  }, [isLoggedIn]);

  useEffect(() => {
    const removeReceived = addNotificationReceivedListener((n) => {
      console.log("[push] received:", n.request.content.title, n.request.content.body);
    });
    const removeResponse = addNotificationResponseReceivedListener((r) => {
      console.log("[push] tapped:", r.notification.request.content.title);
    });
    return () => {
      removeReceived();
      removeResponse();
    };
  }, []);

  const tabLabel = (key: string) => {
    const map: Record<string, { vi: string; en: string }> = {
      command: { vi: "Lệnh", en: "Command" },
      tasks: { vi: "Tác vụ", en: "Tasks" },
      approvals: { vi: "Duyệt", en: "Approvals" },
      results: { vi: "Kết quả", en: "Results" },
    };
    return map[key]?.[locale] || key;
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen locale={locale} onLoggedIn={() => setIsLoggedIn(true)} />;
    }
    switch (screen.type) {
      case "command":
        return <CommandScreen locale={locale} onSubmitted={() => setScreen({ type: "tasks" })} />;
      case "task-detail":
        return <TaskDetailScreen runId={screen.id} locale={locale} onBack={() => setScreen({ type: "tasks" })} />;
      case "approvals":
        return <ApprovalsScreen locale={locale} />;
      case "results":
        return <ResultsScreen locale={locale} />;
      default:
        return <TaskListScreen locale={locale} onSelectRun={(id) => setScreen({ type: "task-detail", id })} />;
    }
  };

  if (checkingAuth) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>{locale === "vi" ? "Đang tải..." : "Loading..."}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>{content.appTitle}</Text>
        <View style={styles.headerActions}>
          {isLoggedIn && (
            <Pressable style={styles.logoutBtn} onPress={() => { api.logout(); setIsLoggedIn(false); }}>
              <Text style={styles.logoutText}>{locale === "vi" ? "Đăng xuất" : "Logout"}</Text>
            </Pressable>
          )}
          <Pressable style={styles.localeBtn} onPress={() => setLocale(locale === "vi" ? "en" : "vi")}>
            <Text style={styles.localeText}>{locale === "vi" ? "EN" : "VI"}</Text>
          </Pressable>
        </View>
      </View>
      {isLoggedIn && (
        <View style={styles.tabBar}>
          {tabs.map((t) => (
            <Pressable key={t} style={[styles.tab, tab === t && styles.tabActive]} onPress={() => { setTab(t); setScreen({ type: t === "tasks" ? "tasks" : t === "approvals" ? "approvals" : "results" } as Screen); }}>
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{tabLabel(t)}</Text>
            </Pressable>
          ))}
        </View>
      )}
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#080B12" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "#EEF2F6", fontSize: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#223148" },
  title: { color: "#EEF2F6", fontSize: 20, fontWeight: "700" },
  headerActions: { flexDirection: "row", gap: 8, alignItems: "center" },
  logoutBtn: { borderWidth: 1, borderColor: "#D7B46A", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  logoutText: { color: "#D7B46A", fontWeight: "700", fontSize: 12 },
  localeBtn: { borderWidth: 1, borderColor: "#223148", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  localeText: { color: "#EEF2F6", fontWeight: "700" },
  tabBar: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#223148" },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center" },
  tabActive: { borderBottomWidth: 2, borderBottomColor: "#4EA3FF" },
  tabText: { color: "#aab4c0", fontSize: 14 },
  tabTextActive: { color: "#EEF2F6", fontWeight: "700" },
});
