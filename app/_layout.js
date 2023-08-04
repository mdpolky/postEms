import { Platform } from "react-native";
import { Link, Tabs, Slot } from "expo-router";

export default function Layout() {
  if (Platform.OS === "web") {
    // Use a basic custom layout on web.
    return (
      <div style={{ flex: 1 }}>
        <Slot />
      </div>
    );
  }
  // Use a native bottom tabs layout on native platforms.
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Notes" }} />
    </Tabs>
  );
}
