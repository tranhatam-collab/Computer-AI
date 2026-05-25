import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { api } from "../api/client";

interface Props {
  locale: "vi" | "en";
  onLoggedIn: () => void;
}

export function LoginScreen({ locale, onLoggedIn }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const t = {
    vi: {
      loginTitle: "Đăng nhập",
      registerTitle: "Đăng ký",
      email: "Email",
      name: "Tên",
      loginBtn: "Đăng nhập",
      registerBtn: "Đăng ký",
      switchLogin: "Đã có tài khoản? Đăng nhập",
      switchRegister: "Chưa có tài khoản? Đăng ký",
      error: "Lỗi",
    },
    en: {
      loginTitle: "Sign in",
      registerTitle: "Sign up",
      email: "Email",
      name: "Name",
      loginBtn: "Sign in",
      registerBtn: "Sign up",
      switchLogin: "Have an account? Sign in",
      switchRegister: "No account? Sign up",
      error: "Error",
    },
  }[locale];

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (mode === "register") {
        await api.register(email.trim(), name.trim(), locale);
      }
      await api.login(email.trim());
      onLoggedIn();
    } catch (err: any) {
      setError(err.message || t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{mode === "login" ? t.loginTitle : t.registerTitle}</Text>
      <TextInput
        style={styles.input}
        placeholder={t.email}
        placeholderTextColor="#64748b"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      {mode === "register" && (
        <TextInput
          style={styles.input}
          placeholder={t.name}
          placeholderTextColor="#64748b"
          value={name}
          onChangeText={setName}
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={[styles.btn, loading && styles.btnDisabled]} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.btnText}>{mode === "login" ? t.loginBtn : t.registerBtn}</Text>
      </Pressable>
      <Pressable style={styles.switchBtn} onPress={() => setMode((m) => (m === "login" ? "register" : "login"))}>
        <Text style={styles.switchText}>{mode === "login" ? t.switchRegister : t.switchLogin}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 14, backgroundColor: "#080B12" },
  header: { color: "#EEF2F6", fontSize: 24, fontWeight: "700", marginBottom: 8 },
  input: { backgroundColor: "#111826", color: "#EEF2F6", borderRadius: 14, borderWidth: 1, borderColor: "#223148", padding: 16, fontSize: 16 },
  error: { color: "#ef4444", fontSize: 14 },
  btn: { backgroundColor: "#4EA3FF", borderRadius: 14, paddingVertical: 16, alignItems: "center", marginTop: 8 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: "#EEF2F6", fontWeight: "700", fontSize: 16 },
  switchBtn: { alignItems: "center", marginTop: 8 },
  switchText: { color: "#4EA3FF", fontSize: 14 },
});
