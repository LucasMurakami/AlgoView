import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

const CategoryScreen = () => {
  const { id } = useLocalSearchParams();
  const { isDarkMode, toggleTheme } = useTheme();
  const isDark = isDarkMode;
  
  const bgColor = isDark ? '#121212' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#121212';
  const accentColor = '#4F46E5';
  
  // Função para obter informações da categoria com base no ID
  const getCategoryInfo = (categoryId) => {
    const categoriesMap = {
      'sorting': {
        title: 'Algoritmos de Ordenação',
        description: 'Algoritmos que colocam elementos de uma lista em uma certa ordem.'
      },
      'searching': {
        title: 'Algoritmos de Busca',
        description: 'Algoritmos para encontrar um elemento dentro de uma estrutura de dados.'
      },
      'graph': {
        title: 'Algoritmos de Grafos',
        description: 'Algoritmos que processam estruturas de dados de grafos.'
      },
      'network': {
        title: 'Fluxo de Rede',
        description: 'Algoritmos para otimização de fluxo em redes.'
      },
      'string': {
        title: 'Processamento de Strings',
        description: 'Algoritmos para manipulação e análise de strings.'
      },
      'math': {
        title: 'Algoritmos Matemáticos',
        description: 'Algoritmos para resolver problemas matemáticos e numéricos.'
      },
      'compression': {
        title: 'Compressão de Dados',
        description: 'Algoritmos para reduzir o tamanho de dados.'
      },
      'crypto': {
        title: 'Algoritmos Criptográficos',
        description: 'Algoritmos para criptografia e segurança de dados.'
      },
      'ml': {
        title: 'Machine Learning',
        description: 'Algoritmos de aprendizado de máquina.'
      }
    };
    
    return categoriesMap[categoryId] || { 
      title: 'Categoria Desconhecida', 
      description: 'Esta categoria não foi encontrada.'
    };
  };
  
  const categoryInfo = getCategoryInfo(id);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.content}>
        <Text style={[styles.description, { color: textColor }]}>
          {categoryInfo.description}
        </Text>
        
        <Text style={[styles.comingSoon, { color: isDark ? '#AAAAAA' : '#666666' }]}>
          Os algoritmos desta categoria serão disponibilizados em breve!
        </Text>
      </View>
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Rubik-Bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  themeToggle: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  description: {
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  comingSoon: {
    fontFamily: 'Rubik-Medium',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CategoryScreen;