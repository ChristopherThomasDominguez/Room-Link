import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { resetPassword } from "../../lib/authService";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await resetPassword(email.trim());
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <Text style={styles.title}>Reset Password</Text>

        {/* Instruction */}
        <Text style={styles.instruction}>
          Enter your email and we'll send you a reset link.
        </Text>

        {/* Email input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#8AAFB8"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!success}
        />

        {/* Error */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Success */}
        {success ? (
          <Text style={styles.successText}>
            Check your email for a reset link.
          </Text>
        ) : (
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleReset}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending…" : "Send Reset Email"}
            </Text>
          </TouchableOpacity>
        )}

        {/* Back to login */}
        <View style={styles.backRow}>
          <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
            <Text style={styles.backLink}>Back to Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const TEAL = "#3FA495";
const INPUT_BG = "#D6EEF1";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 72,
    paddingBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: TEAL,
    textAlign: "center",
    marginBottom: 24,
  },
  instruction: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 28,
  },
  input: {
    backgroundColor: INPUT_BG,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111111",
    marginBottom: 16,
  },
  error: {
    color: "#D9534F",
    fontSize: 13,
    marginBottom: 16,
  },
  successText: {
    color: TEAL,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: TEAL,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backRow: {
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 32,
  },
  backLink: {
    fontSize: 14,
    color: TEAL,
    fontWeight: "600",
  },
});
