import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LikedMoviesProvider } from "@/contexts/LikedMoviesContext";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LikedMoviesProvider>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="movie/details"
            options={{
              headerTitle: "",
              headerTintColor: "#f9fafb",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#0f172a",
              },
            }}
          />

          <Stack.Screen
            name="modals/genres"
            options={{
              presentation: "modal",
              headerTitle: "Genres",
              headerTitleStyle: {
                color: "#f9fafb",
              },
              headerStyle: {
                backgroundColor: "#fbbf24",
              },
            }}
          />
        </Stack>
      </LikedMoviesProvider>
    </QueryClientProvider>
  );
}
