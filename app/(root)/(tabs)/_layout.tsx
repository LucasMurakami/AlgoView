import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import ThemeSelector from '@/components/ThemeSelector';
import { View } from 'react-native';

export default function TabLayout() {
  const { colors } = useThemedStyles();
  
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.secondaryText,
      tabBarStyle: { 
        paddingBottom: 4, 
        backgroundColor: colors.card,
        borderTopColor: colors.border
      },
      headerStyle: {
        backgroundColor: colors.card,
      },
      headerTintColor: colors.text,
      headerShadowVisible: false,
      headerRight: () => (
        <View className="mr-4">
          <ThemeSelector size="small" />
        </View>
      )
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}