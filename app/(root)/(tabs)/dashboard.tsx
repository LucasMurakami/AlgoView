import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { algorithmCategories } from '@/constants/algorithmCategories';
import { AlgorithmCategoryGrid, AlgorithmCategory, Header } from '@/components';

const Dashboard = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const isDark = isDarkMode;
  
  const bgColor = isDark ? '#121212' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#121212';
  const accentColor = '#4F46E5';

  const goToCategory = (category: string) => {
    router.push(`/category/${category}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />      
     
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.welcomeText, { color: textColor }]}>
          Bem-vindo ao AlgoView
        </Text>
        <Text style={[styles.subtitleText, { color: isDark ? '#AAAAAA' : '#666666' }]}>
          Escolha uma categoria para começar a explorar algoritmos
        </Text>
        
        {/* Componente de Grid de Categorias */}
        <AlgorithmCategoryGrid
          categories={algorithmCategories}
          onSelectCategory={goToCategory}
          isDark={isDark}
          textColor={textColor}
          showTitle={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Rubik-Bold',
    fontSize: 24,
  },
  themeToggle: {
    padding: 8,
    borderRadius: 20,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  welcomeText: {
    fontFamily: 'Rubik-Bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitleText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 24,
  },
});

export default Dashboard;