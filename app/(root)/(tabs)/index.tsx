import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from "react-native";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const { colors, isDarkMode } = useThemedStyles();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />      
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        </ScrollView>
    </SafeAreaView>
  );
}