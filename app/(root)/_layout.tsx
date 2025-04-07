import React from 'react';
import { View, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { Slot } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { Header } from '@/components';
import { StatusBar } from 'expo-status-bar';

export default function AppLayout() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  const bgColor = isDarkMode ? '#121212' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#121212';
  const accentColor = '#4F46E5';

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Header 
          onThemeToggle={toggleTheme}
          isDark={isDarkMode}
          textColor={textColor}
          accentColor={accentColor}
          isFixed={false}
        />
          <Slot />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
  }
});