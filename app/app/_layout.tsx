import { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { auth, db } from "../lib/firebase";

type AuthState =
  | "loading"
  | "unauthenticated"
  | "authenticated-new"
  | "authenticated-returning";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [authState, setAuthState] = useState<AuthState>("loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthState("unauthenticated");
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const profileComplete =
          snap.exists() && snap.data()?.profileComplete === true;
        setAuthState(
          profileComplete ? "authenticated-returning" : "authenticated-new"
        );
      } catch {
        setAuthState("authenticated-new");
      }
    });

    return unsubscribe;
  }, []);

  if (authState === "loading") {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3FA495" />
      </View>
    );
  }

  // Always render the Stack so Redirect has a navigator to work with
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="RoommateFeatureScreens/roommate-profile"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>

      {authState === "unauthenticated" && <Redirect href="/(auth)/login" />}
      {authState === "authenticated-new" && (
        <Redirect href="/RoommateFeatureScreens/roommate-profile" />
      )}

      <StatusBar style="dark" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
